import Layout from "../../components/Layout"
import PopularMovie from "../../components/Movie/PopularMovie"
import Search from "../../components/Search"

const Home = () => {
    return <Layout isHome={true}>
        <PopularMovie />
        <Search />
    </Layout>
}

export default Home
