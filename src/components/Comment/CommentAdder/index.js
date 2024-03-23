import {useCallback, useState} from 'react'
import Button from '../../ui/atoms/Button'
import Input from '../../ui/atoms/Input'
import Textarea from '../../ui/atoms/Textarea'
import styles from './CommentAdder.module.scss'
import FormErrorMessage from '../../ui/atoms/FormErrorMessage'

const CommentAdder = ({onSubmit}) => {
    const [pseudo, setPseudo] = useState('')
    const [comment, setComment] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = useCallback(e => {
        e.preventDefault()
        setErrorMessage('')
        const form = e.target
        const pseudo = form.pseudo.value
        const content = form.content.value

        if (!pseudo || !content) {
            setErrorMessage('Un des champs n\'est pas rempli.')

            return
        }

        form.reset()
        const date = new Date()

        onSubmit({
            pseudo,
            content,
            date: `${date.toLocaleDateString('fr')}-${date.toLocaleTimeString('fr')}`
        })
    }, [onSubmit])

    return <>
        <h2>Ajouter un commentaire</h2>
        <form className={styles.commentAdder} onSubmit={handleSubmit}>
            <Input
                name="pseudo"
                placeholder="Pseudo"
                value={pseudo}
                onChange={({target}) => setPseudo(target.value)}
            />
            <Textarea
                name="content"
                placeholder="Commentaire"
                value={comment}
                onChange={({target}) => setComment(target.value)}
            />
            <FormErrorMessage message={errorMessage} />
            <Button
                label="Envoyer"
                type="submit"
                className={styles.submit}
            />
        </form>
    </>
}

export default CommentAdder
