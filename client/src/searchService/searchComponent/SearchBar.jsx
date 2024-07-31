import React, { useState, useEffect, useContext } from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRuler, faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { SearchProvider, SearchContext } from './context/SearchContext';
import axios from 'axios';
import MechanicCard from './MechanicCard';
import Map from './Map';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [distanceFilter, setDistanceFilter] = useState(10);
  const [showFilter, setShowFilter] = useState(false);
  const [filterEnabled, setFilterEnabled] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      0.5 - Math.cos(dLat)/2 + 
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      (1 - Math.cos(dLon))/2;
  
    return R * 2 * Math.asin(Math.sqrt(a));
  };
  
  const handleSearchClick = (context) => {
    const searchParams = {
      car: context.selectedCar,
      city: context.selectedCity,
      category: context.selectedCategory,
    };

    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      axios.get('http://localhost:3003/api/search', { params: searchParams })
        .then(response => {
          setSearchResults(response.data);
          setShowMap(true);
          setShowFilter(true);
        })
        .catch(error => {
          console.error('Error during search:', error);
        });
    }, (error) => {
      console.error('Error getting user location:', error);
      setShowMap(true);
      setShowFilter(true);
    });
  };

  const filteredResults = searchResults.filter(mechanic => {
    if (!filterEnabled || !userLocation) return true;
    const distance = calculateDistance(userLocation.lat, userLocation.lng, parseFloat(mechanic.latitude), parseFloat(mechanic.longitude));
    return distance <= distanceFilter;
  });

  return (
    <SearchProvider>
      <SearchContext.Consumer>
        {(context) => (
          <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center mb-4">
              <PickCarContainer />
              <CitySearchContainer />
              <PresationContainer />
              <button
                className="bg-[#1FA9B6] text-white px-4 py-2 hover:bg-[#148a94] flex items-center mt-4 md:mt-0"
                onClick={() => handleSearchClick(context)}
              >
                Chercher mecanique
                <FontAwesomeIcon icon={faSearch} size="lg" color="white" className="ml-2" />
              </button>
            </div>
            <div className="flex items-center mt-4">
              <FontAwesomeIcon
                icon={filterEnabled ? faToggleOn : faToggleOff}
                size="2x"
                className="text-gray-600 cursor-pointer mr-2"
                onClick={() => setFilterEnabled(!filterEnabled)}
              />
              <span className="text-gray-700 text-sm font-bold">
                {filterEnabled ? 'Disable' : 'Enable'} Distance Filter
              </span>
            </div>
            {filterEnabled && showFilter && (
              <div className="filter-container mt-4 bg-white p-4 rounded-lg shadow-md">
                <div className="filter-header flex items-center mb-2">
                  <FontAwesomeIcon icon={faRuler} size="lg" className="text-gray-600 mr-2" />
                  <label className="filter-label text-gray-700 text-sm font-bold" htmlFor="distance">
                    Filter by distance (km):
                  </label>
                </div>
                <input
                  type="range"
                  id="distance"
                  name="distance"
                  min="1"
                  max="50"
                  value={distanceFilter}
                  onChange={(e) => setDistanceFilter(e.target.value)}
                  className="filter-range w-full"
                />
                <div className="filter-range-marks flex justify-between text-gray-600 mt-1 text-sm">
                  <span>1 km</span>
                  <span>50 km</span>
                </div>
                <div className="filter-distance text-gray-700 mt-1 text-sm">Selected distance: {distanceFilter} km</div>
              </div>
            )}
            {showMap && <Map mechanics={filteredResults} userLocation={userLocation} distanceFilter={distanceFilter} />}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredResults.map(mechanic => (
                <MechanicCard key={mechanic._id} mechanic={mechanic} userLocation={userLocation} />
              ))}
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    </SearchProvider>
  );
};

export default SearchBar;
