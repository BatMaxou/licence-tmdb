import styles from './Input.module.scss'
import cn from '../../../../utils/classnames'

const Input = ({type = 'text', id, name, placeholder, value = null, onChange, className}) => {
    return <input
        id={id}
        className={cn(styles.input, className)}
        placeholder={placeholder}
        name={name}
        {...(type === 'checkbox' ? (value ? {checked: true} : {checked: false}) : {value})}
        type={type}
        onChange={onChange}
    />
}

export default Input;
