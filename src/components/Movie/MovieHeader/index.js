
import styles from './MovieHeader.module.scss'
import MovieImage from "../MovieImage"
import MovieFavorite from '../MovieFavorite'

const MovieHeader = ({movie}) => {
    return <div className={styles.movieHeader}>
        <img
            src={movie.backdrop_path ? `${process.env.REACT_APP_API_IMAGE_BASE_URL}${movie.backdrop_path}` : '/images/default-background.png'}
            alt={`Fond du film ${movie.title}`}
            className={styles.background}
        />
        <div className={styles.mainInfos}>
            <MovieImage
                posterPath={movie.poster_path}
                movieTitle={movie.title}
                className={styles.poster}
            />
            <h1 className={styles.title}>{movie.title}</h1>
        </div>
        <MovieFavorite movie={movie} className={styles.favorite} />
    </div>
}

export default MovieHeader
