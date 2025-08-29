import React from 'react';
import '../../css/style.css'


const Footer =() => {
    return(
    <footer>
    <p>© 2025 iMovies</p>
        <hr className="solid" />

        <div className="redes">
          <a
            href="https://www.facebook.com/imdb"
            target="_blank"
            rel="noopener noreferrer"
            className="icono_redes"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.instagram.com/imdb/"
            target="_blank"
            rel="noopener noreferrer"
            className="icono_redes"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.youtube.com/@imdb"
            target="_blank"
            rel="noopener noreferrer"
            className="icono_redes"
          >
            <i className="fab fa-youtube"></i>
          </a>
        </div>
    </footer>
    )
}


export default Footer;