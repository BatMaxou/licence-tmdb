import {useCallback, useEffect, useState} from 'react'
import {useDebounce} from '@uidotdev/usehooks'
import {useNavigate, useSearchParams} from 'react-router-dom'

import styles from './Search.module.scss'
import getGenreColor from '../../utils/genreColors'
import ApiClient from '../../api/ApiClient'
import Input from '../ui/atoms/Input'
import List from '../ui/atoms/List'
import Loader from '../ui/atoms/Loader'
import SearchTag from '../ui/molecules/SearchTag'
import PaginatedList from '../ui/molecules/PaginatedList'
import MovieCard from '../Movie/MovieCard'
import TvCard from '../Tv/TvCard'
import PersonCard from '../Person/PersonCard'

const Search = () => {
    const [loader, setLoader] = useState(false)
    const [genres, setGenres] = useState(null)
    const [genresSearched, setGenresSearched] = useState({})
    const [searchedResults, setSearchedResults] = useState(null)
    const [searchedInput, setSearchedInput] = useState('')
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)
    const [whatChanged, setWhatChanged] = useState('')
    const [onlyMovie, setOnlyMovie] = useState(true)
    const debouncedSearchInput = useDebounce(searchedInput, 500)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        ApiClient.get('/genre/movie/list?language=fr')
            .then(data => setGenres(data.genres))

        const queryMulti = searchParams.get('multi')
        const queryInput = searchParams.get('input')
        const queryGenre = searchParams.get('genre')
        const queryPage = searchParams.get('page')

        setPage(queryPage ? parseInt(queryPage, 10) : 1)

        if (queryMulti) {
            setSearchedInput(queryMulti)
            setOnlyMovie(false)
            setWhatChanged('input')

            return
        }

        setOnlyMovie(true)

        if (queryInput) {
            setSearchedInput(queryInput)
            setWhatChanged('input')

            return
        }

        if (queryGenre) {
            queryGenre.split(',').forEach(genre => setGenresSearched(genres => ({
                ...(genres ?? {}),
                [genre]: true
            })))
            setWhatChanged('genres')
        }
    }, [])

    useEffect(() => {
        const genreCount = Object.values(genresSearched).length

        if (!debouncedSearchInput && genreCount === 0) {
            setSearchedResults(null)
        }

        if (whatChanged === 'input') {
            if (genreCount > 0) {
                setGenresSearched({})
            }

            setLoader(true)

            if (onlyMovie) {
                ApiClient.get(`/search/movie?query=${debouncedSearchInput}&include_adult=true&language=fr_FR&page=${page}`)
                    .then(data => {
                        setSearchedResults(data.results)
                        setMaxPage(data.total_pages)
                        setLoader(false)
                        navigate(`/?input=${debouncedSearchInput}&page=${page}`);
                    })

                return
            }

            ApiClient.get(`/search/multi?query=${debouncedSearchInput}&include_adult=true&language=fr_FR&page=${page}`)
                .then(data => {
                    setSearchedResults(data.results)
                    setMaxPage(data.total_pages)
                    setLoader(false)
                    navigate(`/?multi=${debouncedSearchInput}&page=${page}`);
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
            ApiClient.get(`/discover/movie?include_adult=true&include_video=false&language=fr_FR&page=${page}&sort_by=popularity.desc&with_genres=${genreQuery}`)
                .then(data => {
                    setSearchedResults(data.results)
                    setMaxPage(data.total_pages)
                    setLoader(false)
                    navigate(`/?genre=${genreQuery}&page=${page}`);
                })

            return
        }
    }, [whatChanged, debouncedSearchInput, genresSearched, page, onlyMovie])

    const handleGenreAdd = useCallback(genre => {
        setOnlyMovie(true)
        setGenresSearched(genres => ({
            ...(genres ?? {}),
            [genre.id]: true
        }))
        setPage(1)
        setWhatChanged('genres')
    }, [])

    const handleGenreRemove = useCallback(genre => {
        Object.values(genresSearched).filter(genre => genre).length > 1 && setOnlyMovie(true)
        setGenresSearched(genres => ({
            ...(genres ?? {}),
            [genre.id]: false
        }))
        setPage(1)
        setWhatChanged('genres')
    }, [genresSearched])

    const renderResult = useCallback(result => {
        if (onlyMovie) {
            return <MovieCard movie={result} />
        }

        switch (result.media_type) {
            case 'movie':
                return <MovieCard movie={result} />
            case 'tv':
                return <TvCard tv={result} />
            case 'person':
                return <PersonCard person={result} />
            default:
                return <MovieCard movie={result} />
        }
    }, [onlyMovie])

    return <div className={styles.search}>
        <h2 className={styles.subtitle}>Que voulez-vous regarder ?</h2>
        <Input
            name="search"
            placeholder={onlyMovie ? 'Rechercher un film' : 'Rechercher un film, une serie, un(e) acteur(trice)'}
            value={searchedInput}
            onChange={event => {
                setSearchedInput(event.target.value)
                setPage(1)
                setWhatChanged('input')
            }}
            className={styles.searchInput}
        />
        <div className={styles.checkboxContainer}>
            <label htmlFor="onlyMovie"> Rechercher uniquement des films</label>
            <Input
                id="onlyMovie"
                name="onlyMovie"
                type="checkbox"
                value={onlyMovie}
                onChange={() => setOnlyMovie(!onlyMovie)}
            />
        </div>
        {genres && <List
            collection={genres}
            renderItem={genre => <SearchTag
                label={genre.name}
                color={getGenreColor(genre)}
                isActive={!!genresSearched[genre.id]}
                onClick={() => handleGenreAdd(genre)}
                onRemove={() => handleGenreRemove(genre)}
            />}
            className={styles.genreList}
        />}
        {loader && <Loader />}
        {searchedResults && <PaginatedList
            collection={searchedResults}
            renderItem={renderResult}
            current={page}
            onNext={() => setPage(page + 1)}
            onPrevious={() => setPage(page - 1)}
            maxPage={maxPage}
            className={styles.movieList}
        />}
    </div>
}

export default Search
