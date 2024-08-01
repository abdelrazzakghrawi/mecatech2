// SearchBar.jsx
import React from 'react';
import { SearchProvider } from './context/SearchContext';
import useSearch from '../hooks/useSearch';
import SearchInputs from './SearchInputs';
import SearchDisplay from './SearchDisplay';
import 'leaflet/dist/leaflet.css';

const SearchBar = () => {
  const {
    searchResults,
    showMap,
    userLocation,
    distanceFilter,
    setDistanceFilter,
    showFilter,
    filterEnabled,
    setFilterEnabled,
    handleSearchClick,
  } = useSearch();

  return (
    <SearchProvider>
      <div className="container mx-auto p-4">
        <SearchInputs onSearch={handleSearchClick} />
        <SearchDisplay
          searchResults={searchResults}
          userLocation={userLocation}
          distanceFilter={distanceFilter}
          setDistanceFilter={setDistanceFilter}
          showFilter={showFilter}
          filterEnabled={filterEnabled}
          setFilterEnabled={setFilterEnabled}
          showMap={showMap}
        />
      </div>
    </SearchProvider>
  );
};

export default SearchBar;
