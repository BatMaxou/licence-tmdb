
import styles from './MovieHeader.module.scss'
import MovieFavorite from '../MovieFavorite'
import Poster from '../../Poster'

const MovieHeader = ({movie}) => {
    return <div className={styles.movieHeader}>
        <img
            src={movie.backdrop_path ? `${process.env.REACT_APP_API_IMAGE_BASE_URL}${movie.backdrop_path}` : '/images/default-background.png'}
            alt={`Fond du film ${movie.title}`}
            className={styles.background}
        />
        <div className={styles.mainInfos}>
            <Poster
                title={movie.title}
                posterPath={movie.poster_path}
                className={styles.poster}
            />
            <h1 className={styles.title}>{movie.title}</h1>
        </div>
        <MovieFavorite movie={movie} className={styles.favorite} />
    </div>
}

export default MovieHeader
