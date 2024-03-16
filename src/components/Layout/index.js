import styles from './Layout.module.scss'
import cn from '../../utils/classnames'

const Layout = ({children, className}) => {
    return <div className={cn(styles.layout, className)}>
        <h1>Film.io</h1>
        {/* navbar */}
        {children}
        {/* footer */}
    </div>
}

export default Layout;
