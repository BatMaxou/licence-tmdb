import styles from './MovieImage.module.scss'
import cn from '../../../utils/classnames'

const MovieImage = ({movieTitle, posterPath, className}) => {
    return <img
        src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}${posterPath}`}
        alt={`Affiche de ${movieTitle}`}
        className={cn(styles.image, className)}
    />
}

export default MovieImage
