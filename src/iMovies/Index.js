import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "4526760c";

export default function MoviesApp() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [historial, setHistorial] = useState(
    JSON.parse(localStorage.getItem("favorites_historial")) || []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const url = `https://www.omdbapi.com/?s=movie&y=2025&type=movie&apikey=${apiKey}`;
        const res = await axios.get(url);

        if (res.data.Response === "True") {
          setMovies(res.data.Search);
        } else {
          setError("No se encontraron películas");
        }
      } catch (err) {
        setError("Error en la búsqueda: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // 🔹 Persistencia en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("favorites_historial", JSON.stringify(historial));
  }, [historial]);

  // 🔹 Funciones
  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const addToHistorial = (movie) => {
    if (!historial.some((fav) => fav.imdbID === movie.imdbID)) {
      setHistorial([...historial, movie]);
    }
  };

  const eliminarFav = (id) => {
    setFavorites(favorites.filter((fav) => fav.imdbID !== id));
  };

  const eliminarHist = (id) => {
    setHistorial(historial.filter((fav) => fav.imdbID !== id));
  };

  // 🔹 Mostrar detalles con Axios (similar a tu mostrarDestacados)
  const fetchMovieDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`
      );
      if (res.data.Response === "True") {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        // Aquí podrías abrir un modal o redirigir
        window.location.href = "results.html";
      }
    } catch (err) {
      console.error("Error al obtener detalles:", err.message);
    }
  };

  return (
    <div>
      <h2>Películas del 2025</h2>

      {loading && <p><i className="fa-solid fa-spinner"></i> Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="movies-info">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onFavorite={() => addToFavorites(movie)}
            onHistorial={() => addToHistorial(movie)}
            onDetails={() => fetchMovieDetails(movie.imdbID)}
          />
        ))}
      </div>

    </div>
  );
}

// 🔹 Componente para una película
function MovieCard({ movie, onFavorite, onHistorial, onDetails }) {
  const imagen = movie.Poster !== "N/A" ? movie.Poster : "img/Image-not-found.png";

  return (
    <div className="movie-card">
      <img src={imagen} alt={movie.Title} />
      <div className="desc_title">
        <h4>{movie.Title}</h4>
        <h5>
          {movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)} ({movie.Year})
        </h5>
      </div>
      <div className="descripcion_button">
        <button className="descripcion_card" onClick={onHistorial}>
          <i className="fa fa-binoculars" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
