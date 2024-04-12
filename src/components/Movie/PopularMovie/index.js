import {useEffect, useState} from 'react'

import styles from './PopularMovie.module.scss'
import ApiClient from '../../../api/ApiClient'
import Swiper from "../../../components/Swiper/Swiper"
import MovieCard from '../MovieCard'
import Loader from '../../ui/atoms/Loader'


const PopularMovie = () => {
    const [popularMovies, setPopularMovies] = useState(null)

    useEffect(() => {
        ApiClient.get('/movie/popular?language=fr&page=1')
            .then(data => setPopularMovies(data.results))
    }, [])

    return <div className={styles.popularMovie}>
        <h2 className={styles.subtitle}>Les films du moment</h2>
        {popularMovies ? <Swiper
            collection={popularMovies}
            renderItem={movie => <MovieCard movie={movie} />}
        /> : <Loader />}
    </div>
}

export default PopularMovie
