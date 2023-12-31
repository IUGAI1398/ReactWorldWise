import { useState } from 'react'
import './index.css'
import 'leaflet/dist/leaflet.css'

import {MapContainer,TileLayer} from 'react-leaflet'


function MapSuccess() {
  const [count, setCount] = useState(0)

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
   </MapContainer>
  )
}

export default MapSuccess
