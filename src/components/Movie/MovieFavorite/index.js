import {useContext, useEffect, useState} from "react"

import {FavoriteMovieContext} from "../../../contexts/FavoriteMovieContext";

const MovieFavorite = ({movie, className}) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const {favoriteMovieList, addFavoriteMovie, removeFavoriteMovie} = useContext(FavoriteMovieContext)

    useEffect(() => {
        setIsFavorite(Object.values(favoriteMovieList).find(favoriteMovie => favoriteMovie.id === movie.id))
    }, [favoriteMovieList, movie])

    return <img
        src={isFavorite ? '/images/icon-heart-red.svg' : '/images/icon-border-heart-white.svg'}
        alt={isFavorite ? 'Coeur plein' : 'Coeur vide'}
        onClick={() => isFavorite ? removeFavoriteMovie(movie) : addFavoriteMovie(movie)}
        className={className}
    />
}

export default MovieFavorite
