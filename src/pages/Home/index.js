import {useEffect, useState} from "react"

import styles from "./Home.module.scss"
import Layout from "../../components/Layout"
import ApiClient from "../../api/ApiClient"
import List from '../../components/ui/atoms/List'
import MovieCard from "../../components/Movie/MovieCard"

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        ApiClient.get('/movie/popular?language=fr_FR&page=1')
            .then(data => setPopularMovies(data.results))
    }, [])

    return <Layout>
        <h2>Les films du moment</h2>
        <List
            collection={popularMovies}
            renderItem={movie => <MovieCard movie={movie} />}
            className={styles.movieList}
        />
    </Layout>
}

export default Home
