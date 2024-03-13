import cn from '../../../../utils/classnames'
import styles from './Card.module.scss'

const Card = ({children, onClick, className}) => {
    return <div className={cn(styles.card, className)} onClick={onClick}>
        {children}
    </div>
}

export default Card;
