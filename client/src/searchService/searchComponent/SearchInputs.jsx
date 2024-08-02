// SearchInputs.jsx
import React from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import SearchButton from './SearchButton';
import { SearchContext } from './context/SearchContext';

const SearchInputs = ({ onSearch }) => {
  return (
    <SearchContext.Consumer>
      {(context) => (
        <div className="container mx-auto p-4 ">
          <div className="flex flex-col md:flex-row items-center mb-4 ">
            <PickCarContainer />
            <CitySearchContainer />
            <PresationContainer />
            <SearchButton onClick={() => onSearch(context)} />
          </div>
        </div>
      )}
    </SearchContext.Consumer>
  );
};

export default SearchInputs;
