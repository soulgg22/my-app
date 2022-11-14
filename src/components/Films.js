import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from  'react-router-dom';
import {useDispatch} from "react-redux";
import './Films.css';


const Films = (props) => {
    const [moviesData, setMoviesData] = useState([]);
    const [moviesDataNextPage, setMoviesDataNextPage] = useState([]);
    const [searchFilm, setSearchFilm] = useState('');
    const [hoverFilm, setHoverFilm] = useState('none');
    const dispatch = useDispatch();
    const [selectPage, setSelectPage] = useState(1);
    const [activePages, setActivePages] = useState([1, 2, 3]);
    const setFilmId = props.setFilmId;

    async function getMovies() {
        await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${selectPage}`)
            .then(res => {
            const data = res.data.data.movies;
            setMoviesData(data);
            })
            .catch(error => console.log(error));

        await axios.get(`https://yts.mx/api/v2/list_movies.json?page=${selectPage + 1}`)
            .then(res => {
                const data = res.data.data.movies;
                setMoviesDataNextPage(data);
            })
            .catch(error => console.log(error));
    }

    async function searchMovies() {
        await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${searchFilm}`)
            .then(res => {
                const data = res.data.data.movies;
                setMoviesData(data);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getMovies();
        if (selectPage > 2 && moviesDataNextPage) {
            setActivePages([selectPage - 1, selectPage,  selectPage + 1]);
        } else if (selectPage > 2) {
            setActivePages([selectPage - 1, selectPage]);
        } else if (selectPage <= 2) {
            setActivePages([1, 2, 3]);
        }
    },[selectPage]);

    useEffect(() => {
        if (searchFilm.length >= 3) {
            searchMovies();
        } else {
            getMovies();
        }
    },[searchFilm]);

    function searchFilms(event) {
        let text = event.target.value;
        if (text.length >= 3) {
            setSearchFilm(text);
        } else {
            setSearchFilm('');
        }
    }

    const viewFilms = () => {
        return (
            <>
                {moviesData ? moviesData.map(item => {
                    return (
                        <div key={item.id}>
                            <div
                                className="films_container"
                                onClick={() => {dispatch({type:'SELECT', payload: item})}}
                            >
                                <div
                                    className="films_image"
                                    style={item.title === hoverFilm ? {border: '5px solid #51d219'} : {border: '5px solid #fff'}}>
                                    <img src={item.medium_cover_image} alt="" width="200" height="300"/>
                                </div>
                                <div className="films_name">
                                    {item.title ?
                                        <Link className="details_link" to={`/${item.id}`}>
                                            {item.title.length >= 20 ? item.title.slice(0, 20) + '...' : item.title}
                                        </Link>
                                        : null}
                                </div>
                                <div className="films_year">{item.year}</div>
                                <div
                                    className='view_info'
                                    style={item.title === hoverFilm ? {border: `5px solid #51d219`, opacity: '0.5'}
                                        : {border: `5px solid #51d219`, opacity: '0'}}
                                    onMouseEnter={() => {setHoverFilm(item.title)}}
                                    onMouseLeave={() => {setHoverFilm('none')}}
                                >
                                </div>
                                <div
                                    className='star_five'
                                    style={item.title === hoverFilm ? {opacity: '1'} : {opacity: '0'}}
                                    onMouseEnter={() => {setHoverFilm(item.title)}}
                                    onMouseLeave={() => {setHoverFilm('none')}}
                                ></div>
                                <div
                                    className='view_rating'
                                    style={item.title === hoverFilm ? {opacity: '1'} : {opacity: '0'}}
                                    onMouseEnter={() => {setHoverFilm(item.title)}}
                                    onMouseLeave={() => {setHoverFilm('none')}}
                                >
                                    <p>{item.rating === 0 ? null : item.rating + ' / 10'}</p>
                                </div>
                                <div
                                    className='view_genres'
                                    onMouseEnter={() => {setHoverFilm(item.title)}}
                                    onMouseLeave={() => {setHoverFilm('none')}}
                                    style={item.title === hoverFilm ? {opacity: '1'} : {opacity: '0'}}
                                >
                                    {item.genres ? item.genres.slice(0, 2).map(item => {return <div key={item}>{item}</div>}) : null}
                                </div>
                                <div
                                    className='view_details'
                                    style={item.title === hoverFilm ? {opacity: '1', top: '-605px'} : {opacity: '0', top: '-565px'}}
                                    onMouseEnter={() => {setHoverFilm(item.title)}}
                                    onMouseLeave={() => {setHoverFilm('none')}}
                                    onClick={() => setFilmId(item.id)}
                                >
                                    <Link className='details_link' to={`/film/${item.id}`}>View Details</Link>
                                </div>
                            </div>
                        </div>
                    )
                }) : null}
            </>
        )
    }

    const pages = () => {
        return(
            <>
                {selectPage === 1 ? <div style={{marginRight: '13px', width: '71px'}}></div> :
                    <div
                        className='pages'
                        style={{marginRight: '10px', width: '71px'}}
                        onClick={()=>{selectPage === 1 ? setSelectPage() : setSelectPage(prevState => prevState - 1)}}
                    >Prev page</div>
                }

                <div className='pages_container'>
                    {activePages.map(item =>{
                        return(
                            <div
                                className={selectPage === item ? 'pages_off' : 'pages'}
                                onClick={() => {
                                    selectPage === item ? setSelectPage(prevState => prevState) : setSelectPage(item);
                                }}
                            >{item}</div>
                        )
                    })}
                </div>
                {activePages.length === 2 ? null :
                    <div
                    className='pages'
                    style={{marginLeft: '10px'}}
                    onClick={()=>{setSelectPage(prevState => prevState + 1)}}
                >Next page</div>}

            </>
        )
    }

    return (
        <div className="App">
            <div className="films_main">
                <div className='header'>
                    <div className='films_pages'>
                        {pages()}
                    </div>
                    <div className='films_search'>
                        <input
                            className='search_input'
                            type="text"
                            placeholder='Search'
                            onInput={event => {searchFilms(event)}}
                        />
                    </div>
                </div>
                <div className='body'>
                    {viewFilms()}
                </div>

                <div className='footer header'>
                    <div className='films_pages'>
                        {pages()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Films;