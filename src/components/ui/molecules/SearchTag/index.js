import {useEffect, useState} from "react"

import styles from './SearchTag.module.scss'
import cn from '../../../../utils/classnames'
import Tag from "../../atoms/Tag"

const SearchTag = ({label, color, isActive, onClick, onRemove}) => {
    const [active, setActive] = useState(false)

    const handleClick = () => {
        active ? onRemove() : onClick()
        setActive(!active)
    }

    useEffect(() => {
        setActive(isActive)
    }, [isActive])

    return <Tag
        label={label}
        color={color}
        onClick={handleClick}
        className={cn(styles.searchTag, active ? styles.active : '')} />
}

export default SearchTag
