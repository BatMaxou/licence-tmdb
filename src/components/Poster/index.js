import styles from './Poster.module.scss'
import cn from '../../utils/classnames'

const Poster = ({title, posterPath, className}) => {
    return <img
        src={posterPath ? `${process.env.REACT_APP_API_IMAGE_BASE_URL}${posterPath}` : '/images/filmio.png'}
        alt={`Poster de ${title}`}
        className={cn(styles.image, className)}
    />
}

export default Poster
