import styles from './Layout.module.scss'

const Layout = ({children}) => {
    return <div className={styles.layout}>
        <h1>Les films à la une</h1>
        {children}
    </div>
}

export default Layout;
