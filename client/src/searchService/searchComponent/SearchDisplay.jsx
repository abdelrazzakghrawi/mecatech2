// SearchDisplay.jsx
import React from 'react';
import SearchMapAndFilter from './SearchMapAndFilter';
import SearchResults from './SearchResults';
import  { useState } from 'react';
import { SearchContext } from './context/SearchContext';
import SearchSummary from './SearchSummary';


const SearchDisplay = ({
  searchResults,
  userLocation,
  distanceFilter,
  setDistanceFilter,
  showFilter,
  filterEnabled,
  setFilterEnabled,
  showMap,
}) => {
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };
  const [isMapVisible, setIsMapVisible] = useState(showMap);

  const filteredResults = searchResults.filter(mechanic => {
    if (!filterEnabled || !userLocation) return true;
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      parseFloat(mechanic.latitude),
      parseFloat(mechanic.longitude)
    );
    return distance <= distanceFilter;
  });
  const toggleMap = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <>
    {showMap && (
    <>
    
    <button 
      onClick={toggleMap} 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
    >
      {isMapVisible ? "Hide Map" : "Show Map"}
    </button>

    {isMapVisible && (
      <SearchMapAndFilter
        searchResults={filteredResults}
        userLocation={userLocation}
        distanceFilter={distanceFilter}
        setDistanceFilter={setDistanceFilter}
        showFilter={showFilter}
        filterEnabled={filterEnabled}
        setFilterEnabled={setFilterEnabled}
      />
    )}
    
    <SearchResults
      searchResults={filteredResults}
      userLocation={userLocation}
    />
 
  </>
)}
   </>
  
  );
};

export default SearchDisplay;