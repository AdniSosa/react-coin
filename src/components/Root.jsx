import { Link, Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <>
            <nav>
                <Link to='/'></Link>
                <Link to='/coin/:id'></Link>
                <Link to='/favorites'></Link>
            </nav>
            <Outlet />
        </>
    )
}

export default Root;