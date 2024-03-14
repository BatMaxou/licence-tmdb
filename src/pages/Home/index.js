import {useEffect, useState} from "react"
import {useDebounce} from "@uidotdev/usehooks";

import styles from "./Home.module.scss"
import Layout from "../../components/Layout"
import ApiClient from "../../api/ApiClient"
import List from '../../components/ui/atoms/List'
import MovieCard from "../../components/Movie/MovieCard"
import Swiper from "../../components/Swiper/Swiper"
import Input from "../../components/ui/atoms/Input"

const Home = () => {
    const [searched, setSearched] = useState('')
    const [popularMovies, setPopularMovies] = useState(null)
    const [searchedMovies, setSerchedMovies] = useState(null)
    const debouncedSearch = useDebounce(searched, 500)

    useEffect(() => {
        ApiClient.get('/movie/popular?language=fr_FR&page=1')
            .then(data => setPopularMovies(data.results))
    }, [])

    useEffect(() => {
        ApiClient.get(`/search/movie?query=${debouncedSearch}&include_adult&language=fr_FR&page=1`)
            .then(data => setSerchedMovies(data.results))
    }, [debouncedSearch])

    return <Layout>
        {popularMovies && <>
            <h2 className={styles.subtitle}>Les films du moment</h2>
            <Swiper
                collection={popularMovies}
                renderItem={movie => <MovieCard movie={movie} />}
            />
        </>}
        <h2 className={styles.subtitle}>Que voulez-vous regarder ?</h2>
        <Input
            name={'search'}
            placeholder={'Rechercher un film'}
            onChange={event => setSearched(event.target.value)}
            className={styles.search}
        />
        {searchedMovies && <List
            collection={searchedMovies}
            renderItem={movie => <MovieCard movie={movie} />}
            className={styles.movieList}
        />}
    </Layout>
}

export default Home
