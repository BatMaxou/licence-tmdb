import styles from './Layout.module.scss'
import cn from '../../utils/classnames'
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = ({isHome = false, children, className}) => {
    return <div className={cn(styles.layout, className)}>
        {isHome && <h1>Film.io</h1>}
        <Navbar className={isHome && styles.navbarHome} />
        {children}
        <Footer />
    </div>
}

export default Layout;
