import styles from './Layout.module.scss'

const Layout = ({children}) => {
    return <div className={styles.layout}>
        <h1>Film.io</h1>
        {children}
    </div>
}

export default Layout;
