import {createBrowserRouter, Route} from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';
import Coin from './components/Coin';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {path: '/', element: <Home />},
            {path: '/coin/:id', element: <Coin />}
        ]
    }
])

export default Router;