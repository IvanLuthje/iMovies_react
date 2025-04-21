import React from 'react';
import { Link } from 'react-router-dom';

import '../../css/style.css'
const Modal = (props) => {
    return(
      <header>
        {/* <div class="imagen"> <Link to="/"><img src={require('../../img/International_Pokémon_logo.svg.png')} /></Link></div> */}
        <div class="imagen"><img src={require('../../img/logo.png')} /></div>
      </header>
    );
}

export default Modal;
