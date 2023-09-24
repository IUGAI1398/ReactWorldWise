import React from 'react'
import styles from './Map.css'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSearchParams, useNavigate } from 'react-router-dom'
import "leaflet/dist/leaflet.css";

export default function Map() {

  const navigate = useNavigate()
  const { mapPostion, setMapPostion } = useState([51.505, -0.09]);

  const [searchParams, setserachParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng")
  
  return (
    
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
     </MapContainer>

  )
}
