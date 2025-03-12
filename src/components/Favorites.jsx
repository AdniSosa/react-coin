import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Favorites.module.css";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [updatedFavorites, setUpdatedFavorites] = useState([]);
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);

        if (storedFavorites.length === 0) return;
        const fetchUpdatedFavorites = async () => {
            try {
                const response = await fetch("https://api.coincap.io/v2/assets/");
                if (!response.ok) throw new Error("Error al obtener las criptomonedas");

                const data = await response.json();
                const allCoins = data.data;
                const updatedData = storedFavorites.map(fav =>
                    allCoins.find(coin => coin.id === fav.id) || fav
                );

                setUpdatedFavorites(updatedData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUpdatedFavorites();
    }, []);

    // Eliminar favorito desde favoritos
    const removeFavorite = (id) => {
        const newFavorites = favorites.filter(fav => fav.id !== id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setFavorites(newFavorites);
        setUpdatedFavorites(newFavorites);
    };

    return (
        <>
        <div >
            <Link to="/"className={styles.homeLink}>Volver a Home</Link>
        </div>
        <div  className={styles.FavoritesList} >
            <h1>Mis Criptos Favoritas</h1>
            {updatedFavorites.length === 0 ? (
                <p>No hay criptomonedas favoritas.</p>
            ) : (
                <ul>
                    {updatedFavorites.map(coin => (
                        <li key={coin.id}>
                            <Link to={`/coin/:${coin.id}`}><h2>{coin.name}</h2></Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <button onClick={() => removeFavorite(coin.id)} className={styles.FavoritesButton}>Quitar</button>
        </>
    );
};

export default Favorites;

