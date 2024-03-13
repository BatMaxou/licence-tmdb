import styles from './Tag.module.scss'
import cn from '../../../../utils/classnames'

const Tag = ({label, className}) => {
    return <div className={cn(styles.tag, className)}>
        {label}
    </div>
}

export default Tag
