import cn from '../../../../utils/classnames'
import styles from './List.module.scss'

const List = ({collection, uniqueAttr = null, render, className}) => {
    if (!uniqueAttr) {
        uniqueAttr = element => element.id
    }

    return <ul className={cn(styles.list, className)}>
        {collection.map((element) => <li key={uniqueAttr(element)}>{render(element)}</li>)}
    </ul>
}

export default List;
