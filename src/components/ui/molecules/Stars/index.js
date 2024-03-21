import {useEffect, useRef} from 'react'

import styles from './Stars.module.scss'

const Stars = ({number = 5, percentage = 100, onClick = null}) => {
    const filledStars = useRef()

    useEffect(() => {
        filledStars?.current?.style.setProperty('--width', `${percentage}%`)
    }, [filledStars, percentage])

    const starMapping = [...Array(number).keys()]

    return <div className={styles.stars}>
        {starMapping.map(index => <img
            key={index}
            src={'/images/star.png'}
            alt="base étoile"
            {...(onClick ? {
                onClick: () => onClick(index),
                className: styles.clickable
            } : {})}
        />)}
        <div ref={filledStars} className={styles.filledStars}>
            {starMapping.map(index => <img
                key={index}
                src={'/images/filled-star.png'}
                alt="étoile pleine"
                {...(onClick ? {
                    onClick: () => onClick(index),
                    className: styles.clickable
                } : {})}
            />)}
        </div>
    </div>
}

export default Stars
