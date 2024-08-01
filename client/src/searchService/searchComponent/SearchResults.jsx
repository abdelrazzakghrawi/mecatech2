// SearchResults.jsx
import React from 'react';
import ResultsGrid from './ResultsGrid';

const SearchResults = ({ searchResults, userLocation }) => (
  <div className="search-results-container mt-8">
    <ResultsGrid filteredResults={searchResults} userLocation={userLocation} />
  </div>
);

export default SearchResults;
