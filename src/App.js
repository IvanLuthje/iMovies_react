import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Contacto from "./iMovies/Contacto";
import Footer from "./components/layout/Footer";
import Busqueda from "./iMovies/Busqueda";
import Index from "./iMovies/Index";
import Historial from "./iMovies/Historial";
import Favoritos from "./iMovies/Favoritos";


function App(){
    return(
      <div className="App">
        <Router>
        <Header></Header>
        <Nav/>

        <Routes>
          <Route path="/" exact element={ <Index />}> </Route>
          <Route path="/busqueda" exact element={ <Busqueda />}> </Route>
          <Route path="/contacto" exact element={ <Contacto />}> </Route>
          <Route path="/historial" exact element={ <Historial />}> </Route>
          <Route path="/favoritos" exact element={ <Favoritos />}> </Route>

        </Routes>
  

        </Router>
   
        <Footer/>
      </div>
      
    )
}

export default App;
