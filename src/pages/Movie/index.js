import {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {useLiveQuery} from "dexie-react-hooks"

import styles from './Movie.module.scss'
import ApiClient from "../../api/ApiClient"
import Layout from "../../components/Layout"
import MovieHeader from "../../components/Movie/MovieHeader"
import MovieDetails from "../../components/Movie/MovieDetails"
import DexieClient from "../../dexie/DexieClient"
import List from "../../components/ui/atoms/List"
import Comment from "../../components/Comment"
import CommentAdder from "../../components/Comment/CommentAdder"

const Movie = () => {
    const [movie, setMovie] = useState({})
    const {id} = useParams();

    const comments = useLiveQuery(() => DexieClient.getDatabase().comment
        .where('movieId')
        .equals(id)
        .toArray()
    )

    const addComment = useCallback((comment) => {
        DexieClient.addComment({...comment, movieId: id})
    }, [id])

    useEffect(() => {
        ApiClient.get(`/movie/${id}?language=fr&append_to_response=credits`)
            .then(data => setMovie(data))
    }, [id])

    return <Layout className={styles.layout}>
        <MovieHeader movie={movie} />
        <MovieDetails movie={movie} />
        <CommentAdder onSubmit={comment => addComment(comment)} />
        {comments && <List
            collection={comments}
            renderItem={comment => <Comment
                pseudo={comment.pseudo}
                date={comment.date}
                content={comment.content}
            />}
            className={styles.commentList}
        />}
    </Layout>
}

export default Movie
