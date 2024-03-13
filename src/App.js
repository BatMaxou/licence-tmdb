import {BrowserRouter, Routes, Route} from 'react-router-dom';

import './styles/index.scss'
import Home from './pages/Home';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path="/">
                <Route index element={<Home />} />
                <Route path="*" element={<div>404</div>} />
            </Route>
        </Routes>
    </BrowserRouter>
}

export default App;
