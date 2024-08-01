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
  return (
    <>
      {showMap && (
        <>
          <SearchMapAndFilter
            searchResults={searchResults}
            userLocation={userLocation}
            distanceFilter={distanceFilter}
            setDistanceFilter={setDistanceFilter}
            showFilter={showFilter}
            filterEnabled={filterEnabled}
            setFilterEnabled={setFilterEnabled}
          />
          <SearchResults
            searchResults={searchResults}
            userLocation={userLocation}
          />
        </>
      )}
    </>
  );
};

export default SearchDisplay;
