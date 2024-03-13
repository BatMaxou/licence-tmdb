import styles from './Button.module.scss'
import cn from '../../../../utils/classnames'

const Button = ({label = 'Button', type, onClick, className}) => {
    return <button className={cn(styles.btn, className)} type={type} onClick={onClick}>{label}</button>
}

export default Button
