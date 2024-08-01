// useSearch.js
import { useState } from 'react';
import axios from 'axios';

const useSearch = () => {
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

  return {
    searchResults,
    showMap,
    userLocation,
    distanceFilter,
    setDistanceFilter,
    showFilter,
    filterEnabled,
    setFilterEnabled,
    handleSearchClick,
    calculateDistance,
  };
};

export default useSearch;
