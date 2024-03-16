import styles from './Tag.module.scss'
import cn from '../../../../utils/classnames'
import {useEffect, useRef} from 'react'

const Tag = ({label, color, onClick, className}) => {
    const tag = useRef()

    useEffect(() => {
        tag?.current?.style.setProperty('--color', color ?? '#fff')
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
