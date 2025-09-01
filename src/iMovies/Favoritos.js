import React, {useState} from "react";
import axios from "axios";

const apiKey = "4526760c";

const Favoritos = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((f) => f.imdbID !== id));
  };


  const viewDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`
      );
      if (res.data.Response === "True") {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        window.location.href = "results.html";
      }
    } catch (err) {
      console.error("Error al obtener detalles", err.message);
    }
  };

  return (
    <main>

      <h2>Favoritos</h2>
      {favorites.length ? (
        <div>
          {favorites.map((fav) => (
            <MovieCard
              key={fav.imdbID}
              movie={fav}
              onDetails={() => viewDetails(fav.imdbID)}
              onRemove={() => removeFavorite(fav.imdbID)}
            />
          ))}
        </div>
      ) : (
        <p>No hay favoritos</p>
      )}

   
    </main>
  );
}

function MovieCard({ movie, onDetails, onFavorite, onHistorial, onRemove }) {
  const imagen = movie.Poster !== "N/A" ? movie.Poster : "img/Image-not-found.png";

  return (
    <div className="favorite-container">
      <img src={imagen} alt={movie.Title} />
    
        <h4>{movie.Title}</h4>
        <h5>
          {movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1)} ({movie.Year})
        </h5>
    
      <div className="descripcion_button">
      
        {onFavorite && (
          <button onClick={onFavorite}>
            <i className="fa fa-heart" aria-hidden="true"></i>
          </button>
        )}
        {onDetails && (
          <button onClick={onDetails}>
            <i className="fa fa-info-circle" aria-hidden="true"></i>
          </button>
        )}
        {onRemove && (
          <button className="eliminar" onClick={onRemove}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Favoritos;
