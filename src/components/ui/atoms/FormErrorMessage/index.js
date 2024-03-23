import styles from './FormErrorMessage.module.scss'
import cn from '../../../../utils/classnames'

const FormErrorMessage = ({message, className}) => <span className={cn(styles.error, className)}>{message}</span>

export default FormErrorMessage
