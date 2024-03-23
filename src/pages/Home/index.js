import Layout from "../../components/Layout"
import SearchMovie from "../../components/Movie/SearchMovie";
import PopularMovie from "../../components/Movie/PopularMovie"

const Home = () => {
    return <Layout isHome={true}>
        <PopularMovie />
        <SearchMovie />
    </Layout>
}

export default Home
