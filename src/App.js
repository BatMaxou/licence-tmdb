import {useCallback, useEffect, useState} from 'react';

import Layout from './components/Layout';
import PokemonCard from './components/PokemonCard';
import List from './components/ui/atoms/List';
import PokemonModal from './components/PokemonModal';
import Loader from './components/ui/atoms/Loader';
import './styles/index.scss'

function App() {
    const [pokemons, setPokemons] = useState([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const [currentPokemon, setCurrentPokemon] = useState(null)


    const handleScroll = useCallback(() => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            setOffset(offset + 30);
        }
    }, [offset])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [handleScroll])

    useEffect(() => {
        setLoading(true)
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=30&offset=${offset}`)
            .then((response) => response.json())
            .then((data) => {
                setPokemons(pokemons => [...pokemons, ...data.results])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [offset])


    return <Layout>
        <List
            collection={pokemons}
            uniqueAttr={element => element.name}
            render={pokemon => <PokemonCard
                pokemon={pokemon}
                onClick={pokemon => setCurrentPokemon(pokemon)}
            />}
        />

        {currentPokemon && <PokemonModal pokemon={currentPokemon} setCurrentPokemon={setCurrentPokemon} />}

        {loading && <Loader />}
    </Layout>
}

export default App;
