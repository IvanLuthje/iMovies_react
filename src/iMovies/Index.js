import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = "4526760c";

const Index = () => {
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("movie");
  const [movies, setMovies] = useState([]);
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");
  
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


  const handleSearch = async () => {
    if (!title.trim()) {
      setMessage("Debe ingresar un título para continuar");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const url = `https://www.omdbapi.com/?s=${title}&type=${filter}&apikey=${apiKey}`;
      const res = await axios.get(url);

      if (res.data.Response === "True") {
        setResults(res.data.Search);
      } else {
        setMessage(`⚠️ No se encontraron resultados para ${title}`);
      }
    } catch (err) {
      setMessage("Error en la búsqueda: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Mostrar detalles con Axios (similar a tu mostrarDestacados)
  const fetchMovieDetails = async (id) => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=full`
      );
      if (res.data.Response === "True") {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        window.location.href = "results.html";
      }
    } catch (err) {
      console.error("Error al obtener detalles:", err.message);
    }
  };

  return (
    
    <main>
      <div className="search-bar">
        <input className="id_nombre"
          type="text"
          placeholder="Escribe un título..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="boton_busqueda" onClick={handleSearch}><i class="fa fa-search"></i></button>
        <select className="id_nombre" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="movie">Película</option>
          <option value="series">Serie</option>
          <option value="episode">Episodio</option>
        </select>
        
      </div>

      {loading && <p><i className="fa-solid fa-spinner"></i> Cargando...</p>}
      {message && <p>{message}</p>}


      <div className="movies-info">
        {results.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onDetails={() => viewDetails(movie.imdbID)}
            onFavorite={() => addToFavorites(movie)}
            onHistorial={() => addToHistorial(movie)}
          />
        ))}
      </div>

      <h2>Películas del año</h2>

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


function MovieCard({ movie, onFavorite, onHistorial, onDetails}) {
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

export default Index;