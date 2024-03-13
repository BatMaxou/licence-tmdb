import styles from './Modal.module.scss'
import cn from '../../../../utils/classnames'
import {useRef} from 'react'

const Modal = ({
    closeModal = null,
    renderHeader = () => <span className={styles.cross} onClick={() => closeModal && closeModal()}>❌</span>,
    renderContent = null,
    renderFooter = null,
    backgroundClassName,
    className
}) => {
    const modalBackground = useRef(null)

    const onModalBackgroundClick = ({target}) => {
        if (modalBackground && modalBackground.current === target) {
            closeModal && closeModal()
        }
    }

    return <div ref={modalBackground} className={cn(styles.modalBackground, backgroundClassName)} onClick={(e) => onModalBackgroundClick(e)}>
        <div className={cn(styles.modal, className)}>
            {renderHeader && <div className={styles.header}>
                {renderHeader()}
            </div>}

            {renderContent && renderContent()}
            {renderFooter && renderFooter()}
        </div>
    </div>
}

export default Modal
