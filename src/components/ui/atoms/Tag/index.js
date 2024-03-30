import styles from './Tag.module.scss'
import cn from '../../../../utils/classnames'
import {useEffect, useRef} from 'react'
import blackOrWhite from '../../../../utils/blackOrWhite'

const Tag = ({label, color, onClick, className}) => {
    const tag = useRef()

    useEffect(() => {
        if (!color) {
            return
        }

        if (Array.isArray(color)) {
            tag?.current?.style.setProperty('--background', `linear-gradient(90deg, ${color.join(', ')})`)
            tag?.current?.style.setProperty('--color', blackOrWhite(color[0]) === 'B' ? '#333' : '#fff')

            return
        }

        tag?.current?.style.setProperty('--background-color', color ?? '#fff')
        tag?.current?.style.setProperty('--color', blackOrWhite(color) === 'B' ? '#333' : '#fff')
    }, [tag, color])

    return <div
        ref={tag}
        onClick={onClick}
        className={cn(styles.tag, className)}
    >
        {label}
    </div>
}

export default Tag
