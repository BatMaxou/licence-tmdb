import styles from './PaginatedList.module.scss'
import cn from '../../../../utils/classnames'
import List from '../../atoms/List'
import NavigationBlock from './navigation'

const PaginatedList = ({
    collection,
    renderItem,
    current,
    onNext,
    onPrevious,
    maxPage,
    className,
    uniqueAttr = null,
}) => {
    return <div className={cn(styles.paginatedList, className)}>
        {collection.length > 0 && <NavigationBlock
            current={current}
            onNext={onNext}
            onPrevious={onPrevious}
            maxPage={maxPage}
            className={styles.topNavBlock}
        />}
        <List
            collection={collection}
            renderItem={renderItem}
            uniqueAttr={uniqueAttr}
        />
        {collection.length > 0 && <NavigationBlock
            current={current}
            onNext={onNext}
            onPrevious={onPrevious}
            maxPage={maxPage}
        />}
    </div>
}

export default PaginatedList
