import {useCallback, useEffect, useState} from "react"

import styles from "./MovieRate.module.scss"
import Stars from "../../ui/molecules/Stars"
import ApiClient from "../../../api/ApiClient"
import Button from "../../ui/atoms/Button"

const MovieRate = ({movie}) => {
    const [rate, setRate] = useState(0)

    const handleRate = useCallback(value => {
        setRate(value)
        ApiClient.post(`/movie/${movie.id}/rating`, {value})
    }, [movie.id])

    const handleRemoveRate = useCallback(() => {
        setRate(0)
        ApiClient.delete(`/movie/${movie.id}/rating`)
    }, [movie.id])

    useEffect(() => {
        if (movie.id) {
            ApiClient.get(`/movie/${movie.id}/account_states`)
                .then(data => setRate(data.rated?.value || 0))
        }
    }, [movie.id])

    return <>
        <Stars
            percentage={rate * 10}
            onClick={index => handleRate((index + 1) * 2)}
        />
        <Button
            label="Retirer ma note"
            onClick={handleRemoveRate}
            className={styles.removeBtn}
        />
    </>
}

export default MovieRate
