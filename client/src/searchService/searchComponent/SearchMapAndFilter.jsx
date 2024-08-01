// SearchMapAndFilter.jsx
import React from 'react';
import Map from './Map';
import DistanceFilterToggle from './DistanceFilterToggle';
import DistanceFilter from './DistanceFilter';

const SearchMapAndFilter = ({
  searchResults,
  userLocation,
  distanceFilter,
  setDistanceFilter,
  showFilter,
  filterEnabled,
  setFilterEnabled,
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
    <div className="search-map-filter-container">
      <DistanceFilterToggle filterEnabled={filterEnabled} setFilterEnabled={setFilterEnabled} />
      {filterEnabled && showFilter && (
        <DistanceFilter distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} />
      )}
      <Map mechanics={filteredResults} userLocation={userLocation} distanceFilter={distanceFilter} />
    </div>
  );
};

export default SearchMapAndFilter;
