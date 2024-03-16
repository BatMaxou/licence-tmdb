import styles from './Input.module.scss'
import cn from '../../../../utils/classnames'

const Input = ({type = 'text', name, placeholder, value = null, onChange, className}) => {
    return <input
        className={cn(styles.input, className)}
        placeholder={placeholder}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
    />
}

export default Input;
