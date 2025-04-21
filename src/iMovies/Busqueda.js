import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Componente principal de la aplicación
function Busqueda() {
  // Estados para almacenar los datos
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);

  // API Key de OMDb - normalmente deberías almacenar esto en variables de entorno
  // La API key gratuita de OMDb permite hasta 1000 solicitudes diarias
  const API_KEY = '4526760c'; 
  // Función para buscar películas
  const searchMovies = async (pageNum = 1) => {
    if (!searchTerm) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Construir la URL con los parámetros de búsqueda
      let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}&page=${pageNum}`;
      
      // Añadir filtros opcionales si están definidos
      if (year) url += `&y=${year}`;
      if (type) url += `&type=${type}`;
      
      const response = await axios.get(url);
      
      if (response.data.Response === 'True') {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Error al conectar con la API. Por favor, inténtelo de nuevo.');
      console.error('Error:', err);
    }
    
    setLoading(false);
  };

  // Efecto para realizar la búsqueda cuando cambie la página
  useEffect(() => {
    if (searchTerm) {
      searchMovies(page);
    }
  }, [page]);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Resetear a la primera página cuando se hace una nueva búsqueda
    searchMovies(1);
  };

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalResults / 10)) {
      setPage(newPage);
    }
  };

  return (
    <div className="app-container">

      
      <div id="search-container">
        <form onSubmit={handleSubmit}>
          <div className="search-input">
            <input
            className="id_nombre"
              type="text"
              placeholder="Buscar películas, series, etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button type="submit" className="boton_busqueda"><i class="fa fa-search"></i></button>
          </div>
          
          <div className="filters">
            <div className="filter-item">
              <label htmlFor="year">Año:</label>
              <input
                id="year"
                type="text"
                placeholder="Ej: 2020"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            
            <div className="filter-item">
              <label htmlFor="type">Tipo:</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="movie">Película</option>
                <option value="series">Serie</option>
                <option value="episode">Episodio</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      
      {loading && <div className="loading">Cargando...</div>}
      
      {error && <div className="error-message">{error}</div>}
      
      {movies.length > 0 && (
        <div className="results">
          <div className="results-info">
            <p>Se encontraron {totalResults} resultados</p>
            <p>Página {page} de {Math.ceil(totalResults / 10)}</p>
          </div>
          
          <div id="movies-info">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          
          <div className="pagination">
            <button 
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Anterior
            </button>
            <span>{page} de {Math.ceil(totalResults / 10)}</span>
            <button 
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= Math.ceil(totalResults / 10)}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Componente para mostrar una película individual
function MovieCard({ movie }) {
  const [details, setDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const API_KEY = '4526760c'; // Reemplazar con tu propia API key

  // Función para obtener detalles de una película
  const fetchMovieDetails = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
      );
      setDetails(response.data);
    } catch (err) {
      console.error('Error al obtener detalles:', err);
    }
  };

  // Manejar clic en la tarjeta para mostrar más detalles
  const handleCardClick = () => {
    if (!details) {
      fetchMovieDetails();
    }
    setShowDetails(!showDetails);
  };



  return (
    <div className="movie-card" onClick={handleCardClick}>
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
      ) : (
        <div className="no-poster"><img src={require('../img/Image-not-found.png')}></img></div>
      )}
      
      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Year} {movie.Type}</p>
        
        {showDetails && details && (
          <div className="movie-details">
            <p><strong>Director:</strong> {details.Director}</p>
            <p><strong>Actores:</strong> {details.Actors}</p>
            <p><strong>Género:</strong> {details.Genre}</p>
            <p><strong>Trama:</strong> {details.Plot}</p>
            <p><strong>Calificación:</strong> {details.imdbRating}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Busqueda;