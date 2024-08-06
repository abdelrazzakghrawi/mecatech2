import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Custom icons
const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const mechanicIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map = ({ mechanics, userLocation, distanceFilter }) => {
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
        />
        {userPosition && (
          <>
            <Circle
              center={userPosition}
              radius={distanceFilter * 1000} // Convert km to meters
              pathOptions={{ color: 'blue', fillColor: 'lightblue', fillOpacity: 0.3 }}
            />
            <Marker position={userPosition} icon={userIcon}>
              <Popup>
                <strong>Your Location</strong>
              </Popup>
            </Marker>
          </>
        )}
        {mechanics.map(mechanic => {
          const position = parseLatLng(mechanic.latitude, mechanic.longitude);
          if (!position) return null;
          return (
            <Marker key={mechanic._id} position={position} icon={mechanicIcon}>
              <Popup>
                <strong>{mechanic['Nom Garage']}</strong><br />
                {mechanic['Adresse']}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;