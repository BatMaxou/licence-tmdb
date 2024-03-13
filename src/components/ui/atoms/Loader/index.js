import cn from '../../../../utils/classnames'
import styles from './Loader.module.scss'

const Loader = ({className}) => {
    return <div className={cn(styles.loader, className)}></div>
}

export default Loader
