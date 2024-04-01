import {useContext, useEffect, useMemo, useState} from 'react'

import styles from './Favorites.module.scss'
import Layout from "../../components/Layout"
import MovieCard from '../../components/Movie/MovieCard'
import {FavoriteMovieContext} from '../../contexts/FavoriteMovieContext'
import PaginatedList from '../../components/ui/molecules/PaginatedList'

const Favorites = () => {
    const [page, setPage] = useState(1)
    const [showedFavoriteMovies, setShowedFavoriteMovies] = useState([])
    const {favoriteMovieList} = useContext(FavoriteMovieContext)

    const maxPage = useMemo(() => Math.ceil(favoriteMovieList.length / 20), [favoriteMovieList])

    useEffect(() => {
        const start = (page - 1) * 20
        const end = start + 20

        setShowedFavoriteMovies(favoriteMovieList.slice(start, end))
    }, [favoriteMovieList, page])

    useEffect(() => {
        if (showedFavoriteMovies.length === 0 && page > 1) {
            setPage(page - 1)
        }
    }, [showedFavoriteMovies, page])

    return <Layout className={styles.layout}>
        {showedFavoriteMovies.length > 0 ? <PaginatedList
            collection={showedFavoriteMovies}
            renderItem={movie => <MovieCard movie={movie} />}
            current={page}
            onNext={() => setPage(page + 1)}
            onPrevious={() => setPage(page - 1)}
            maxPage={maxPage}
            className={styles.movieList}
        /> : <p>Vous n'avez pas encore ajouté de favoris</p>}
    </Layout>
}

export default Favorites
