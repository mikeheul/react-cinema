import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Search = () => {

    const [moviesData, setMoviesData] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(() => {
        axios
            .get("https://api.themoviedb.org/3/search/movie?api_key=68ec6963adbf4d67b88cac0414bd2d2d&query=sta&language=fr-FR")
            .then((res) => setMoviesData(res.data.results))
    }, [])  // [} pour ne jouer le useEffect qu'une seule fois]
     
    return (
        <div className="form-component">
            <div className="form-container">
                <form>
                    <input type="text" id="searchInput" placeholder="Entrez le titre d'un film" />
                    <input type="submit" value="Rechercher" />
                </form>

                <div className="btn-sort-container">
                    <div className="btn-sort" id="goodToBad">Top <span>→</span></div>
                    <div className="btn-sort" id="badToGood">Flop <span>←</span></div>
                </div>
            </div>
            <div className="result">
                {
                    moviesData
                        .slice((0,12))
                        .map((movie, index) => (
                        <Card key={index} movie={movie} />
                    ))
                }
            </div>
        </div>
    );
};

export default Search;