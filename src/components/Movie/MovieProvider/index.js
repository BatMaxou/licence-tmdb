import styles from './MovieProvider.module.scss'

const MovieProvider = ({name, logo = null}) => <div className={styles.provider}>
    <p>{name}</p>
    {logo && <img src={`${process.env.REACT_APP_API_IMAGE_BASE_URL}${logo}`} alt={`logo de ${name}`} />}
</div>

export default MovieProvider
