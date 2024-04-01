import styles from './PaginatedList.module.scss'
import cn from '../../../../utils/classnames'
import Button from "../../atoms/Button"

const NavigationBlock = ({current, onNext, onPrevious, maxPage, className}) => {
    const handlePrevious = () => {
        if (current === 1) {
            return
        }

        onPrevious()
    }

    const handleNext = () => {
        if (current === maxPage) {
            return
        }

        onNext()
    }

    return <div className={cn(styles.navBlock, className)}>
        {current !== 1 && <Button
            label='<'
            onClick={handlePrevious}
            className={styles.navBtn}
        />}
        <span>{current}</span>
        {current < maxPage && <Button
            label='>'
            onClick={handleNext}
            className={styles.navBtn}
        />}
    </div>
}

export default NavigationBlock
