import {createContext, useEffect, useState} from "react";

import ApiClient from "../../api/ApiClient";

export const FavoriteMovieContext = createContext({
    addFavoriteMovie: () => {},
    removeFavoriteMovie: () => {},
    favoriteMovieList: [],
});

export const FavoriteMovieContextProvider = ({children}) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const doRequest = page => ApiClient.get(`/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite/movies?page=${page}`)
            .then(data => {
                setFavoriteMovies(favoriteMovies => [...data.results, ...favoriteMovies])

                if (data.page === data.total_pages) {
                    return
                }

                doRequest(data.page + 1)
            })

        doRequest(1)
    }, [])

    const addFavoriteMovie = (movie) => {
        setFavoriteMovies([...favoriteMovies, movie]);

        ApiClient.post(`/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite`, {
            media_type: 'movie',
            media_id: movie.id,
            favorite: true,
        })
    }

    const removeFavoriteMovie = (movie) => {
        setFavoriteMovies(favoriteMovies.filter(favoriteMovie => favoriteMovie.id !== movie.id));

        ApiClient.post(`/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite`, {
            media_type: 'movie',
            media_id: movie.id,
            favorite: false,
        })
    }

    return (
        <FavoriteMovieContext.Provider value={{
            addFavoriteMovie,
            removeFavoriteMovie,
            favoriteMovieList: favoriteMovies,
        }}>
            {children}
        </FavoriteMovieContext.Provider>
    );
};
