import React from 'react';
import {useSelector} from "react-redux";
import './Film.css';

const Film = () => {
    const selectedFilm = useSelector(state => state.selectedFilm.selectFilm);

    return (
        <div className="App film_info">
            <div>
                <div className='film_image'>
                    <img src={selectedFilm.medium_cover_image} alt="" width="260" height="390"/>
                </div>
                <div className='button_download'>
                    <div className='download_icon'></div>
                    Download
                </div>
            </div>
            <div>
                <div className='film_title'>
                    {selectedFilm.title}
                </div>
                <div className='film_year'>
                    {selectedFilm.year}
                </div>
                <div className='film_year'>
                    {selectedFilm.genres.map(item => {
                        const index = selectedFilm.genres.indexOf(item);
                        const arrLength = selectedFilm.genres.length - 1;
                        return (
                            <>
                                {index === arrLength ? item : item + ' / '}
                            </>
                        )
                    })}
                </div>
                <div className='film_available'>
                    Available in:
                    {selectedFilm.torrents.map(item => {
                        return (
                            <div className='film_quality'>{item.quality + '.' + item.type.toUpperCase()}</div>
                        )
                    })}
                </div>
            </div>
        </div>

        )
}

export default Film;