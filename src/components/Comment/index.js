import styles from './Comment.module.scss'

const Comment = ({pseudo, date, content}) => <div className={styles.comment}>
    <div className={styles.header}>
        <h3>{pseudo}</h3>
        <span>{date}</span>
    </div>
    <p>{content}</p>
</div>


export default Comment
