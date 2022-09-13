import React, {useEffect, useState} from "react";
import axios from "axios";

const Films = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [searchFilm, setSearchFilm] = useState('');
    const [hoverFilm, setHoverFilm] = useState('');

    async function getMovies() {
        const movies = await axios.get("https://yts.mx/api/v2/list_movies.json");
        setMoviesData(movies.data.data.movies);
    }

    async function searchMovies() {
        const searchMovies = await axios.get(`https://yts.mx/api/v2/list_movies.json?query_term=${searchFilm}`)
        setMoviesData(searchMovies.data.data.movies);
    }


    useEffect(() => {
        getMovies();
    },[]);

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
            setSearchFilm(text)
        } else {
            setSearchFilm('')
        }
    }

    const viewFilms = () => {
        return (
            <React.Fragment>
                {moviesData ? moviesData.map(item => {
                    return (
                        <div>
                            <div
                                key={item.id}
                                className="film_container"
                                onClick={() => {console.log(item)}}
                            >
                                <div
                                    className="film_image"
                                    style={item.title === hoverFilm ? {border: '5px solid #51d219'} : {border: '5px solid #fff'}}>
                                    <img src={item.medium_cover_image} alt="" width="200" height="300"/>
                                </div>
                                <div className="film_name">{item.title.length >= 22 ? item.title.slice(0, 22) + '...' : item.title}</div>
                                <div className="film_year">{item.year}</div>
                                <div
                                    className='view_rating'
                                    style={item.title === hoverFilm ? {border: `5px solid #51d219`, opacity: '0.5'}
                                        : {border: `5px solid #51d219`, opacity: '0'}}
                                    onMouseEnter={() => {
                                        setHoverFilm(item.title);
                                    }}
                                    onMouseLeave={() => {
                                        setHoverFilm('');
                                    }}
                                >
                                </div>
                                <div className='star-five'></div>
                                <div
                                    className='view_details'
                                    style={item.title === hoverFilm ? {opacity: '1', top: '-455px'}
                                        : {opacity: '0', top: '-405px'}}
                                    onMouseEnter={() => {
                                        setHoverFilm(item.title);
                                    }}
                                >View Details</div>
                            </div>
                        </div>
                    )
                }) : null}
            </React.Fragment>
        )
    }

    return (
        <div className="App">
            <div className="film_main">
                <div className='header'>
                    <div>

                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder='Search'
                            onInput={event => {searchFilms(event)}}
                        />
                    </div>
                </div>
                <div className='body'>
                    {viewFilms()}
                </div>
                <div className='footer'>

                </div>
            </div>
        </div>
    );
}

export default Films;