import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const coinDetails = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState('');
    //Añadimos favoritos
    const [isFavorite, setIsFavorite] = useState(false)

    
    const getCoinDetails = async () => {
        //console.log(id)
        const id2 = id.slice(1)
        //console.log(id2)
        try {
            const response = await fetch(`https://api.coincap.io/v2/assets/${id2}`)
            console.log(`https://api.coincap.io/v2/assets/${id2}`)

            if(!response.ok) {
                throw new Error('Error al traer los datos de la criptomoneda')
            }

            const data = await response.json();
            console.log(data.data)
            setCoin(data.data);

            //Comprobación
            const favorites = JSON.parse(localStorage.getItem("favorites")) || [] // 
            setIsFavorite(favorites.some(favorite => favorite.id === data.data.id))
        } catch (err) {
            console.error(err)
        }

    }
 
    useEffect(() => {
        getCoinDetails();
    }, [id]);

    // Función favoritos
    const buttomFavorite = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || []

        if(isFavorite) {
            favorites = favorites.filter(favorite => favorite.id !== coin.id)
        } else {
            favorites.push(coin)
        }

        localStorage.setItem("favorites", JSON.stringify(favorites))
        setIsFavorite(!isFavorite)
    }


    return(
        <>
            <h1>{coin.name} ({coin.symbol})</h1>
            <p>Ranking: {coin.rank}</p>
            <p>Precio: ${coin.priceUsd}</p>
            <a href={coin.explorer}>Más información</a>
                <button onClick={buttomFavorite}>
                    {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
                <form>
            </form>
            </button>
        </>
    )
}

export default coinDetails;