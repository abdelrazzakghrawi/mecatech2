import React, { useContext, useState } from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import SearchButton from './SearchButton';
import SearchSummary from './SearchSummary';
import { SearchContext } from './context/SearchContext';

const SearchInputs = ({ onSearch }) => {
  const [showSummary, setShowSummary] = useState(false);
  const context = useContext(SearchContext);

  const handleSearch = () => {
    setShowSummary(true);
    onSearch(context);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center mb-4">
        <PickCarContainer />
        <CitySearchContainer />
        <PresationContainer />
        <SearchButton onClick={handleSearch} />
      </div>
      {showSummary && <SearchSummary />}
    </div>
  );
};

export default SearchInputs;
