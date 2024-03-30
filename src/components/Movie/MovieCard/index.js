import {Link} from 'react-router-dom'
import {useEffect, useRef, useState} from 'react'

import styles from './MovieCard.module.scss'
import Card from '../../ui/atoms/Card'
import Poster from '../../Poster'
import List from '../../ui/atoms/List'
import apiClient from '../../../api/ApiClient'
import Tag from '../../ui/atoms/Tag'
import getGenreColor from '../../../utils/genreColors'
import MovieFavorite from '../MovieFavorite'

const MovieCard = ({movie}) => {
    const [genres, setGenres] = useState([])
    const favorite = useRef(null)

    useEffect(() => {
        setGenres([])
        movie.genre_ids.forEach(id => {
            apiClient.get(`/genre/${id}?language=fr`)
                .then(data => setGenres(genres => [...genres, data]))
        })
    }, [movie])

    return <Link
        to={`/movie/${movie.id}`}
        onClick={(e) => e.target === favorite.current && e.preventDefault()}
    >
        <Card className={styles.card}>
            <MovieFavorite
                movie={movie}
                className={styles.favorite}
                ref={favorite}
            />
            <Poster title={movie.title} posterPath={movie.poster_path} />
            <div className={styles.details}>
                <h3>{movie.title}</h3>
                <List
                    collection={genres}
                    renderItem={genre => <Tag
                        label={genre.name}
                        color={getGenreColor(genre)}
                    />}
                    className={styles.genreList}
                />
                <p>{(new Date(movie.release_date)).toLocaleDateString("fr")}</p>
            </div>
        </Card>
    </Link>
}

export default MovieCard
