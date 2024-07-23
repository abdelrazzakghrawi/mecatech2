import React from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchProvider, SearchContext } from './context/SearchContext';

const SearchBar = () => {
  const handleSearchClick = (context) => {
    console.log('Selected Car:', context.selectedCar);
    console.log('Selected City:', context.selectedCity);
    console.log('Selected Quartier:', context.selectedQuartier);
    console.log('Selected Categories:', context.selectedCategory);
  };

  return (
    <SearchProvider>
      <SearchContext.Consumer>
        {(context) => (
          <div className="container mx-auto flex items-center">
            <PickCarContainer />
            <CitySearchContainer />
            <PresationContainer />
            <button
              className="bg-[#1FA9B6] text-white px-4 py-2 hover:bg-White-600"
              onClick={() => handleSearchClick(context)}
            >
              Chercher mecanique
              <FontAwesomeIcon icon={faSearch} size="lg" color="white" />
            </button>
          </div>
        )}
      </SearchContext.Consumer>
    </SearchProvider>
  );
};

export default SearchBar;
