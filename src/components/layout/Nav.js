import React from 'react';
import { Link } from "react-router-dom";
import menuBar from './menuBar';
import '../../css/style.css'




const Nav = (props) => {


  
    return(
    
      <nav>
        <ul className="menu">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/historial">Historial</Link>
          </li>
          <li>
            <Link to="/contacto">Contacto</Link>
          </li>
          <li>
            <Link to="/compartir">Compartir</Link>
          </li>
          <li>
            <Link to="/favoritos">Lista de favoritos</Link>
          </li>
        </ul>

        <div className="responsive" onClick={menuBar}>
          &#9776;
        </div>
      </nav>
    
    );

    
}

export default Nav;