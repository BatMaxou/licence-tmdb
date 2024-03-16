import styles from './MovieCard.module.scss'
import Card from '../../ui/atoms/Card'
import MovieImage from '../MovieImage'
import List from '../../ui/atoms/List'
import {useEffect, useState} from 'react'
import apiClient from '../../../api/ApiClient'
import Tag from '../../ui/atoms/Tag'
import getGenreColor from '../../../utils/genreColors'

const MovieCard = ({movie}) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        setGenres([])
        movie.genre_ids.forEach(id => {
            apiClient.get(`/genre/${id}?language=fr`)
                .then(data => setGenres(genres => [...genres, data]))
        })
    }, [movie])

    return <Card className={styles.card}>
        <MovieImage movieTitle={movie.title} posterPath={movie.poster_path} />
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
            <p>{movie.release_date}</p>
        </div>
    </Card>
}

export default MovieCard