import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




const icono = new L.Icon({
    iconUrl: require('../img/favicon.png'),
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  
const Contacto = () => {

 
  const position = [-34.922791, -57.956177]; 
  const zoom = 13; 


  return (
    <MapContainer center={position} zoom={zoom} style={{ height: '1080px', width: '100%' }}>
      {/* TileLayer is the base map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    
      <Marker position={position} icon={icono}>
        <Popup>
            Acá estamos nosotros
        </Popup>
      </Marker>
    </MapContainer>

    
  );
};



export default Contacto;
