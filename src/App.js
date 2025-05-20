import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Nav from "./components/layout/Nav";
import Contacto from "./iMovies/Contacto";
import Footer from "./components/layout/Footer";
import Busqueda from "./iMovies/Busqueda";
import Compartir from "./iMovies/Compartir";
function App(){
    return(
      <div className="App">
        <Router>
        <Header></Header>
        <Nav/>

        <Routes>
       
      
          <Route path="/busqueda" exact element={ <Busqueda />}> </Route>
          <Route path="/contacto" exact element={ <Contacto />}> </Route>
          <Route path="/compartir" exact element={ <Compartir />}> </Route>
  
        </Routes>
  

        </Router>
   
        <Footer/>
      </div>
      
    )
}

export default App;
