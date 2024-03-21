import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './styles/index.scss'
import Home from './pages/Home';
import Movie from './pages/Movie';
import {FavoriteMovieContextProvider} from './contexts/FavoriteMovieContext';

function App() {
    return <FavoriteMovieContextProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="movie/:id" element={<Movie />} />
                    <Route path="*" element={<div>404</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    </FavoriteMovieContextProvider>
}

export default App;
