import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const Map = ({ mechanics, userLocation }) => {
  const defaultIcon = L.icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const parseLatLng = (lat, lng) => {
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (isNaN(parsedLat) || isNaN(parsedLng)) {
      return null;
    }
    return [parsedLat, parsedLng];
  };

  const userPosition = userLocation ? parseLatLng(userLocation.lat, userLocation.lng) : [33.5899317, -7.5873941];

  return (
    <div className="w-full h-96 mt-8">
      <MapContainer center={userPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {mechanics.map(mechanic => {
          const position = parseLatLng(mechanic.latitude, mechanic.longitude);
          if (!position) return null;
          return (
            <Marker key={mechanic._id} position={position} icon={defaultIcon}>
              <Popup>
                <strong>{mechanic['Nom Garage']}</strong><br />
                {mechanic['Adresse']}
              </Popup>
            </Marker>
          );
        })}
        {userPosition && (
          <Marker position={userPosition} icon={defaultIcon}>
            <Popup>
              <strong>Your Location</strong>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
