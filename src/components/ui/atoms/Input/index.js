import styles from './Input.module.scss'

const Input = ({id, type = 'text', name, placeholder, setAnswer}) => {
    return <div className={styles.line}>
        <input
            className={styles.input}
            placeholder={placeholder}
            name={name}
            type={type}
        />
        <input
            type={'radio'}
            name={'answer'}
            className={styles.radio}
            onChange={(e) => setAnswer(e.target.checked ? id : null)}
        />
    </div>
}

export default Input;
