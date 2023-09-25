import React, { useState } from 'react';
import styles from './Map.css?inline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const navigate = useNavigate();
  const [arrays, setMapPosition] = useState([51.505, -0.09]); // Fix useState initialization
  const [searchParams, setSearchParams] = useSearchParams(); // Fix variable name

  // Get lat and lng with default values
  const lat = searchParams.get('lat') || 51.505;
  const lng = searchParams.get('lng') || -0.09;

  return (
    <MapContainer center={arrays} scrollWheelZoom={false} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={arrays}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
