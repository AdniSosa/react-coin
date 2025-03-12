import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import styles from "./Home.module.css";

const Home = () => {
    const [coins, setCoins] = useState([]);
    
    const getCoins = async () => {
        try {
            const response = await fetch('https://api.coincap.io/v2/assets/');

            if(!response.ok) {
                throw new Error ('Error al cargar la página ')
            }
            const coinsData = await response.json();
            console.log(coinsData.data);
            
            setCoins(coinsData.data);

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getCoins();
    }, []);
    
    return(
        <>
        <div >
            <Link to="/favorites"className={styles.favoritesLink}>Favoritos</Link>
        </div>
        <div className={styles.Home}>
            <h1>Criptomonedas</h1>
            <ul>
                {coins.map(coin => (
                    <li key={coin.id}>
                        <Link to={`/coin/:${coin.id}`}><h2>{coin.name}</h2></Link>
                    </li>
                ))}
            </ul>
        </div>
        <div >
            <Link to="/favorites"className={styles.favoritosLink}>Favoritos</Link>
        </div>
        </>
    )
}

export default Home;

