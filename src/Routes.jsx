import {createBrowserRouter, Route} from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';
import Coin from './components/Coin';
import Favorites from './components/Favorites'

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {path: '/', element: <Home />},
            {path: '/coin/:id', element: <Coin />},
            {path: '/favorites', element: <Favorites />}
        ]
    }
])

export default Router;