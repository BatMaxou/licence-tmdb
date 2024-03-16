import {useEffect, useState} from 'react'
import {useDebounce} from '@uidotdev/usehooks'

import getGenreColor from '../../../utils/genreColors'
import Input from '../../ui/atoms/Input'
import List from '../../ui/atoms/List'
import Loader from '../../ui/atoms/Loader'
import SearchTag from '../../ui/molecules/SearchTag'
import MovieCard from '../MovieCard'
import styles from './SearchMovie.module.scss'
import ApiClient from '../../../api/ApiClient'

const SearchMovie = () => {
    const [loader, setLoader] = useState(false)
    const [genres, setGenres] = useState(null)
    const [genresSearched, setGenresSearched] = useState({})
    const [searchedMovies, setSearchedMovies] = useState(null)
    const [searchedInput, setSearchedInput] = useState('')
    const [whatChanged, setWhatChanged] = useState('')
    const debouncedSearchInput = useDebounce(searchedInput, 500)

    useEffect(() => {
        ApiClient.get('/genre/movie/list?language=fr')
            .then(data => setGenres(data.genres))
    }, [])

    useEffect(() => {
        const genreCount = Object.values(genresSearched).length

        if (!debouncedSearchInput && genreCount === 0) {
            setSearchedMovies(null)
        }

        if (whatChanged === 'input') {
            if (genreCount > 0) {
                setGenresSearched({})
            }

            setLoader(true)
            ApiClient.get(`/search/movie?query=${debouncedSearchInput}&include_adult=true&language=fr_FR&page=1`)
                .then(data => {
                    setSearchedMovies(data.results)
                    setLoader(false)
                })

            return
        }

        if (whatChanged === 'genres') {
            if (debouncedSearchInput) {
                setSearchedInput('')
            }

            const genreQuery = Object.entries(genresSearched)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join(',')

            setLoader(true)
            ApiClient.get(`/discover/movie?include_adult=true&include_video=false&language=fr_FR&page=1&sort_by=popularity.desc&with_genres=${genreQuery}`)
                .then(data => {
                    setSearchedMovies(data.results)
                    setLoader(false)
                })

            return
        }
    }, [whatChanged, debouncedSearchInput, genresSearched])

    return <div className={styles.searchMovie}>
        <h2 className={styles.subtitle}>Que voulez-vous regarder ?</h2>
        <Input
            name={'search'}
            placeholder={'Rechercher un film'}
            value={searchedInput}
            onChange={event => {
                setSearchedInput(event.target.value)
                setWhatChanged('input')
            }}
            className={styles.searchInput}
        />
        {genres && <List
            collection={genres}
            renderItem={genre => <SearchTag
                label={genre.name}
                color={getGenreColor(genre)}
                isActive={!!genresSearched[genre.id]}
                onClick={() => {
                    setGenresSearched(genres => ({
                        ...(genres ?? {}),
                        [genre.id]: true
                    }))
                    setWhatChanged('genres')
                }}
                onRemove={() => {
                    setGenresSearched(genres => ({
                        ...(genres ?? {}),
                        [genre.id]: false
                    }))
                    setWhatChanged('genres')
                }}
            />}
            className={styles.genreList}
        />}
        {loader && <Loader />}
        {searchedMovies && <List
            collection={searchedMovies}
            renderItem={movie => <MovieCard movie={movie} />}
            className={styles.movieList}
        />}
    </div>
}

export default SearchMovie
