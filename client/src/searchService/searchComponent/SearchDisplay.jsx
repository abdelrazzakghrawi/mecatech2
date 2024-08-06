// SearchDisplay.jsx
import React from 'react';
import SearchMapAndFilter from './SearchMapAndFilter';
import SearchResults from './SearchResults';

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

  return (
    <>
      {showMap && (
        <>
          <SearchMapAndFilter
            searchResults={filteredResults}
            userLocation={userLocation}
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
            showFilter={showFilter}
            filterEnabled={filterEnabled}
            setFilterEnabled={setFilterEnabled}
          />
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