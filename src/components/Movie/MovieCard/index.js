import styles from './MovieCard.module.scss'
import Card from '../../ui/atoms/Card'
import MovieImage from '../MovieImage'

const MovieCard = ({movie}) => {
    return <Card className={styles.card}>
        <MovieImage movieTitle={movie.title} posterPath={movie.poster_path} />
        <div className={styles.details}>
            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
        </div>
    </Card>
}

export default MovieCard
