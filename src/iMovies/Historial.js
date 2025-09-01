import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "4526760c";

const Historial = () => {

  
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("favorites_historial")) || []
  );
  const [message, setMessage] = useState("");

  // 🔹 Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("favorites_historial", JSON.stringify(historial));
  }, [historial]);



  // 🔹 Agregar favoritos
  const addToFavorites = (movie) => {
    if (!favorites.some((f) => f.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    } else {
      setMessage(`❤️ ${movie.Title} ya está agregado`);
    }
  };

  // 🔹 Agregar historial
  const addToHistorial = (movie) => {
    if (!historial.some((h) => h.imdbID === movie.imdbID)) {
      setHistorial([...historial, movie]);
    }
  };

  // 🔹 Eliminar de favoritos
  const removeFavorite = (id) => {
    setFavorites(favorites.filter((f) => f.imdbID !== id));
  };

  // 🔹 Eliminar de historial
  const removeHistorial = (id) => {
    setHistorial(historial.filter((h) => h.imdbID !== id));
  };


  return (
    <main>

      <h2>Historial</h2>
      {historial.length ? (
        <div className="movies-info">
          {historial.map((h) => (
            <MovieCard
              key={h.imdbID}
              movie={h}
              onDetails={() => viewDetails(h.imdbID)}
              onRemove={() => removeHistorial(h.imdbID)}
            />
          ))}
        </div>
      ) : (
        <p>No hay historial</p>
      )}
    </main>
  );
}

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

function MovieCard({ movie, onDetails, onFavorite, onHistorial, onRemove }) {
  <h3>Resultados</h3>
  const imagen = movie.Poster !== "N/A" ? movie.Poster : "../img/Image-not-found.png";
  return (
    <div className="movie-card">
      <img src={imagen} alt={movie.Title} />
      <div className="desc_title">
        <h4>{movie.Title}</h4>
        <h5>
          {movie.Type?.charAt(0).toUpperCase() + movie.Type?.slice(1)} ({movie.Year})
        </h5>
      </div>
      <div className="descripcion_button">
        {onHistorial && (
          <button onClick={onHistorial}>
            <i className="fa fa-binoculars" aria-hidden="true"></i>
          </button>
        )}
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
          <button onClick={onRemove}>
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        )}
      </div>
    </div>
  );
}

export default Historial;