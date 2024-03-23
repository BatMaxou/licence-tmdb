import List from '../ui/atoms/List'
import styles from './Navbar.module.scss'
import cn from '../../utils/classnames'

const Navbar = ({className}) => {
    const links = [
        {id: 1, label: 'Accueil', url: '/'},
        {id: 2, label: 'Favoris', url: '/favorites'},
        {id: 3, label: 'Rechercher', url: '/search'},
    ]

    return <nav className={cn(styles.navbar, className)}>
        <List
            collection={links}
            renderItem={link => <a href={link.url}>{link.label}</a>}
            className={styles.linkList}
        />
    </nav>
}

export default Navbar
