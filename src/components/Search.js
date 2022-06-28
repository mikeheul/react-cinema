import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Search = () => {

    const [moviesData, setMoviesData] = useState([])
    const [searchInput, setSearchInput] = useState("star")
    const [sortGoodBad, setSortGoodBad] = useState(null);

    useEffect(() => {
        axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=68ec6963adbf4d67b88cac0414bd2d2d&query=${searchInput}&language=fr-FR`)
        .then((res) => setMoviesData(res.data.results))
    }, [searchInput])  // [} pour ne jouer le useEffect qu'une seule fois]
     
    return (
        <div className="form-component">
            <div className="form-container">
                <form>
                    <input 
                        type="text"  
                        placeholder="Entrez le titre d'un film" 
                        id="search-input" 
                        onChange={(e) => setSearchInput(e.target.value)}
                     />
                    <input type="submit" value="Rechercher" />
                </form>

                <div className="btn-sort-container">
                    <div className="btn-sort" id="goodToBad" onClick={() => setSortGoodBad("goodToBad")}>Top <span>→</span></div>
                    <div className="btn-sort" id="badToGood" onClick={() => setSortGoodBad("badToGood")}>Flop <span>←</span></div>
                </div>
            </div>
            <div className="result">
                {
                    moviesData
                        .sort((a, b) => {
                            if (sortGoodBad === "goodToBad") {
                            return b.vote_average - a.vote_average;
                            } else if (sortGoodBad === "badToGood") {
                            return a.vote_average - b.vote_average;
                            }
                        })
                        .map((movie, index) => (
                        <Card key={index} movie={movie} />
                    ))
                }
            </div>
        </div>
    );
};

export default Search;