import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"

import styles from './Movie.module.scss'
import ApiClient from "../../api/ApiClient"
import Layout from "../../components/Layout"
import MovieHeader from "../../components/Movie/MovieHeader"
import MovieDetails from "../../components/Movie/MovieDetails"

const Movie = () => {
    const [movie, setMovie] = useState({})
    const {id} = useParams();

    useEffect(() => {
        ApiClient.get(`/movie/${id}?language=fr&append_to_response=credits`)
            .then(data => setMovie(data))
    }, [id])

    return <Layout className={styles.layout}>
        <MovieHeader movie={movie} />
        <MovieDetails movie={movie} />
    </Layout>
}

export default Movie
