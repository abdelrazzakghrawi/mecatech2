import React, { useState, useEffect, useContext } from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import { SearchProvider, SearchContext } from './context/SearchContext';
import axios from 'axios';
import ResultsGrid from './ResultsGrid';
import Map from './Map';
import DistanceFilterToggle from './DistanceFilterToggle';
import DistanceFilter from './DistanceFilter';
import SearchButton from './SearchButton';
import 'leaflet/dist/leaflet.css';

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
              <SearchButton onClick={() => handleSearchClick(context)} />
            </div>
            <DistanceFilterToggle filterEnabled={filterEnabled} setFilterEnabled={setFilterEnabled} />
            {filterEnabled && showFilter && (
              <DistanceFilter distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} />
            )}
            {showMap && <Map mechanics={filteredResults} userLocation={userLocation} distanceFilter={distanceFilter} />}
            <ResultsGrid filteredResults={filteredResults} userLocation={userLocation} />
          </div>
        )}
      </SearchContext.Consumer>
    </SearchProvider>
  );
};

export default SearchBar;