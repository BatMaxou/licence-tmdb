import styles from './Layout.module.scss'
import cn from '../../utils/classnames'

const Layout = ({children, className}) => {
    return <div className={cn(styles.layout, className)}>
        {/* navbar */}
        {children}
        {/* footer */}
    </div>
}

export default Layout;
