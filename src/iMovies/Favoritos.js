import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = "4526760c";

export default function Buscador() {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("movie");
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("favorites_historial")) || []
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Guardar en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("favorites_historial", JSON.stringify(historial));
  }, [historial]);

  // 🔹 Buscar películas
  const handleSearch = async () => {
    if (!title.trim()) {
      setMessage("⚠️ Debe ingresar un título para continuar");
      return;
    }

    setLoading(true);
    setMessage("⏳ Cargando resultados...");
    setResults([]);

    try {
      const url = `https://www.omdbapi.com/?s=${title}&type=${filter}&apikey=${apiKey}`;
      const res = await axios.get(url);

      if (res.data.Response === "True") {
        setResults(res.data.Search);
        setMessage("");
      } else {
        setMessage(`⚠️ No se encontraron resultados para ${title}`);
      }
    } catch (err) {
      setMessage("❌ Error en la búsqueda: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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

  // 🔹 Ver detalles (antes ibas a results.html)
  const viewDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`
      );
      if (res.data.Response === "True") {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        window.location.href = "results.html"; // 👉 o reemplazar por un modal SPA
      }
    } catch (err) {
      console.error("Error al obtener detalles", err.message);
    }
  };

  return (
    <div>

      <h3>Favoritos</h3>
      {favorites.length ? (
        <div className="favorite-container">
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

   
    </div>
  );
}

function MovieCard({ movie, onDetails, onFavorite, onHistorial, onRemove }) {
  const imagen = movie.Poster !== "N/A" ? movie.Poster : "img/Image-not-found.png";

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
