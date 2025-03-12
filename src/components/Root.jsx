import { Link, Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <>
            <nav>
                <Link to='/'>Home</Link>
                <Link to='/coin/:id'>Coin</Link>
                <Link to='/favorites'>Favoritos</Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Root;