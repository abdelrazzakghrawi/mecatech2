import React, { useEffect, useState } from 'react';

const CitySelect = ({ onCityChange }) => {
  const [cities, setCities] = useState([]);
  const searchServiceUrl = process.env.REACT_APP_SEARCH_SERVICE_URL || 'http://localhost:3003';
  useEffect(() => {
    fetch(`${searchServiceUrl}/api/villequartier/villes`)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  return (
    <div className=" w-1/3">
      <label className="sr-only">Choisissez une ville</label>
      <select
        onChange={e => onCityChange(e.target.value)}
        className="w-full px-8 py-6 border-1 border-r-0  focus:outline-none"
      >
        <option value="">Sélectionnez une ville</option>
        {cities.map((city, index) => (
          <option key={city + index} value={city} className="text-gray-700">
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelect;
