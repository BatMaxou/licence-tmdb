import styles from './Textarea.module.scss'

const Textarea = ({name, placeholder, value, onChange}) => {
    return <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        className={styles.textarea}
        onChange={onChange}
    />
}

export default Textarea;
