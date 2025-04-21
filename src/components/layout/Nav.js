import React from 'react';
import { Link } from "react-router-dom";
import '../../css/style.css'

const Nav = (props) => {

  
    return(
      <nav>
        <div>
        <ul class="menu">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/busqueda">Busqueda</Link></li>
            {/* <li><Link to="historial.html">Historial</Link></li> */}
            <li><Link to="/contacto">Contacto</Link></li>
            {/* <li><Link to="compartir.html">Compartir</Link></li> */}
            <div class="responsive" onclick="menuBar()">
            &#9776;
            </div>
        </ul>
        </div>
      </nav>
    
    );
}

export default Nav;