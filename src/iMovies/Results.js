import React, { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const movieData = JSON.parse(sessionStorage.getItem("data"));
    setData(movieData);
  }, []);

  if (!data) {
    return <p>No hay datos de la película seleccionada.</p>;
  }

  const imagen = data.Poster !== "N/A" ? data.Poster : "../img/Image-not-found.png";

  return (
    <main className="movie-detail">
      <button className="cancel2" onClick={() => window.history.back()}>
        <i className="fa fa-chevron-left" aria-hidden="true"></i>
      </button>

      <h2>{data.Title}</h2>

      <div className="inf">
        <div className="title">
          <img src={imagen} alt={data.Title} />
          <div className="botones">
            <button className="compartir" onClick={() => alert("Compartir pronto 😎")}>
              <i className="fa fa-share-alt" aria-hidden="true"></i>
            </button>
            <button
              className="favoritos"
              onClick={() =>
                addToFavorites(data.imdbID, data.Title, data.Poster, data.Type)
              }
            >
              <i className="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
        </div>

        <div className="desc">
          <p>
            <h3>Director:</h3> {data.Director}
          </p>
          <p>
            <h3>Actores:</h3> {data.Actors}
          </p>
          <p>
            <h3>Trama:</h3> {data.Plot}
          </p>
          <p>
            <h3>Año:</h3> {data.Year}
          </p>
          <p>
            <h3>Género:</h3> {data.Genre}
          </p>
          <p>
            <h3>Rating (IMDb):</h3> {data.imdbRating}
          </p>
          <p>
            <h3>País:</h3> {data.Country}
          </p>
          <p>
            <h3>Idioma:</h3> {data.Language}
          </p>
        </div>
      </div>
    </main>
  );
}


function addToFavorites(id, title, poster, type) {
  let favs = JSON.parse(localStorage.getItem("favorites")) || [];
  favs.push({ id, title, poster, type });
  localStorage.setItem("favorites", JSON.stringify(favs));
  alert("Agregado a favoritos ✅");
}

export default Results;