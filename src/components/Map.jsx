import React, { useState, useEffect } from 'react'; // Import useEffect
import styles from './Map.css?inline';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { useCities } from '../contexts/CitiesContext';
import { useGeolocation } from '../hooks/useGeoLocation'
import Button from './Button';

export default function Map() {
  const { cities } = useCities();
  const [mapPositiocn, setMapPosition] = useState([51.505, -0.09]);
  const [searchParams] = useSearchParams(); // Remove unused setserachParams
  const { isLoading: isLoadingPosition, position: geoLocationPositon, getPosition } = useGeolocation();

  // Get lat and lng values from searchParams
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // If both lat and lng exist, update the map position

  useEffect(function () {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(function () {
    if (geoLocationPositon) setMapPosition(
      [geoLocationPositon.lat, geoLocationPositon.lng]
    )
  }, [geoLocationPositon])

  return (
    <>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : "Use your Positon"}
      </Button>
      <MapContainer center={mapPositiocn} scrollWheelZoom={true} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPositiocn} />
        <DetectClick />
      </MapContainer>
    </>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  })
}
