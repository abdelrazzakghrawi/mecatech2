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
  return (
    <div className="search-map-filter-container">
      <DistanceFilterToggle filterEnabled={filterEnabled} setFilterEnabled={setFilterEnabled} />
      {filterEnabled && showFilter && (
        <DistanceFilter distanceFilter={distanceFilter} setDistanceFilter={setDistanceFilter} />
      )}
      <Map mechanics={searchResults} userLocation={userLocation} distanceFilter={distanceFilter} />
    </div>
  );
};

export default SearchMapAndFilter;