import "leaflet/dist/leaflet.css";
import React from 'react'
import styles from './Map.module.css'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSearchParams, useNavigate } from 'react-router-dom'


export default function Map() {

  const navigate = useNavigate()
  const { mapPostion, setMapPostion } = useState([51.505, -0.09]);

  const [searchParams, setserachParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng")
  
  return (
    <div className={styles.mapContainer}>
      <MapContainer  className={styles.map} center={mapPostion} zoom={13} scrollWheelZoom={false} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      </MapContainer>
    </div>
  )
}
