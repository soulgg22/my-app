import './App.css';
import Films from "./components/Films";
import {Routes, Route} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from './store'
import {useState} from "react";
import Film from "./components/Film";



function App() {
    const [filmId, setFilmId] = useState();

    return (
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<Films setFilmId={setFilmId}/>}/>
                <Route path={`/film/${filmId}`} element={<Film/>}/>
            </Routes>
        </Provider>
    )
}

export default App;
