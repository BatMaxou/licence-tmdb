import styles from './PersonCard.module.scss'
import Card from '../../ui/atoms/Card'
import Poster from '../../Poster'

const PersonCard = ({person}) => {

    return <Card className={styles.card}>
        <Poster title={person.name} posterPath={person.profil_path} />
        <div className={styles.details}>
            <h3>{person.name}</h3>
            <p>{person.known_for_department}</p>
        </div>
    </Card>
}

export default PersonCard
