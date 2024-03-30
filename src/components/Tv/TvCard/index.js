import {useEffect, useState} from 'react'

import styles from './TvCard.module.scss'
import getGenreColor from '../../../utils/genreColors'
import Card from '../../ui/atoms/Card'
import List from '../../ui/atoms/List'
import ApiClient from '../../../api/ApiClient'
import Tag from '../../ui/atoms/Tag'
import Poster from '../../Poster'

const TvCard = ({tv}) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        setGenres([])
        tv.genre_ids.forEach(id => {
            ApiClient.get(`/genre/${id}?language=fr`)
                .then(data => setGenres(genres => [...genres, data]))
        })
    }, [tv])

    return <Card className={styles.card}>
        <Poster title={tv.title} posterPath={tv.poster_path} />
        <div className={styles.details}>
            <h3>{tv.name}</h3>
            {genres.length > 0 && <List
                collection={genres}
                renderItem={genre => <Tag
                    label={genre.name}
                    color={getGenreColor(genre)}
                />}
                className={styles.genreList}
            />}
            <p>{(new Date(tv.first_air_date)).toLocaleDateString("fr")}</p>
        </div>
    </Card>
}

export default TvCard
