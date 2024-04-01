import {useMemo} from 'react'

import styles from './MovieDetails.module.scss'
import cn from '../../../utils/classnames'
import getGenreColor from '../../../utils/genreColors'
import List from '../../ui/atoms/List'
import Tag from '../../ui/atoms/Tag'
import Stars from '../../ui/molecules/Stars'
import MovieRate from '../MovieRate'
import MovieProvider from '../MovieProvider'

const MovieDetails = ({movie}) => {
    const providers = useMemo(() => {
        if (
            !movie['watch/providers']
            || !movie['watch/providers'].results
            || !movie['watch/providers'].results['FR']
        ) {
            return null
        }

        return movie['watch/providers'].results['FR']
    }, [movie])

    return <div className={styles.movieDetails}>
        {movie.genres && <List
            collection={movie.genres}
            renderItem={genre => <Tag
                label={genre.name}
                color={getGenreColor(genre)}
            />}
            className={styles.genreList}
        />}
        <div className={styles.grid}>
            <div className={cn(styles.gridItem, styles.full)}>
                <p className={styles.label}>Sorti le : </p>
                <p>{(new Date(movie.release_date)).toLocaleDateString("fr")}</p>
            </div>
            <div className={cn(styles.gridItem, styles.full, styles.column, styles.justify)}>
                <p className={styles.label}>Synopsis : </p>
                <p>{movie.overview}</p>
            </div>
            <div className={cn(styles.gridItem, styles.half, styles.column)}>
                <p className={styles.label}>Produit par : </p>
                {movie.production_companies && <List
                    collection={movie.production_companies}
                    renderItem={companie => <p>{`- ${companie.name}`}</p>}
                    className={styles.subList}
                />}
                {providers && <>
                    {providers.buy && <div className={cn(styles.gridItem, styles.full, styles.column)}>
                        <p className={styles.label}>Disponible à l'achat sur : </p>
                        <List
                            collection={providers.buy}
                            renderItem={provider => <MovieProvider name={`- ${provider.provider_name}`} logo={provider.logo_path} />}
                            uniqueAttr={provider => provider.provider_id}
                            className={styles.subList}
                        />
                    </div>}
                    {providers.rent && <div className={cn(styles.gridItem, styles.full, styles.column)}>
                        <p className={styles.label}>Disponible à la location sur : </p>
                        <List
                            collection={providers.rent}
                            renderItem={provider => <MovieProvider name={`- ${provider.provider_name}`} logo={provider.logo_path} />}
                            uniqueAttr={provider => provider.provider_id}
                            className={styles.subList}
                        />
                    </div>}
                    {providers.flatrate && <div className={cn(styles.gridItem, styles.full, styles.column)}>
                        <p className={styles.label}>Disponible avec un abonnement : </p>
                        <List
                            collection={providers.flatrate}
                            renderItem={provider => <MovieProvider name={`- ${provider.provider_name}`} logo={provider.logo_path} />}
                            uniqueAttr={provider => provider.provider_id}
                            className={styles.subList}
                        />
                    </div>}
                </>}
                <div className={cn(styles.gridItem, styles.full, styles.column)}>
                    <p className={styles.label}>{`Note (${movie.vote_count}) : `}</p>
                    <Stars percentage={movie.vote_average * 10} />
                </div>
                <div className={cn(styles.gridItem, styles.full, styles.column)}>
                    <p className={styles.label}>Votre note : </p>
                    <MovieRate movie={movie} />
                </div>
            </div>
            <div className={cn(styles.gridItem, styles.half, styles.column)}>
                <p className={styles.label}>Casting : </p>
                {movie.credits?.cast && <List
                    collection={movie.credits.cast}
                    renderItem={cast => <p>{`- ${cast.name} [${cast.character || 'Extra'}]`}</p>}
                    className={styles.subList}

                />}
            </div>
        </div>
    </div>
}

export default MovieDetails
