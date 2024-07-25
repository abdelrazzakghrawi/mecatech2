import React, { useState } from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SearchProvider, SearchContext } from './context/SearchContext';
import axios from 'axios';
import MechanicCard from './MechanicCard';

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchClick = (context) => {
    const searchParams = {
      car: context.selectedCar,
      city: context.selectedCity,
      quartier: context.selectedQuartier,
      category: context.selectedCategory,
    };
    console.log(searchParams)
    axios.get('http://localhost:3003/api/search', { params: searchParams })
      .then(response => {
        setSearchResults(response.data);
      })
      .catch(error => {
        console.error('Error during search:', error);
      });
  };

  return (
    <SearchProvider>
      <SearchContext.Consumer>
        {(context) => (
          <div className="container mx-auto">
            <div className="flex items-center">
              <PickCarContainer />
              <CitySearchContainer />
              <PresationContainer />
              <button
                className="bg-[#1FA9B6] text-white  px-4 py-2  hover:bg-white-600"
                onClick={() => handleSearchClick(context)}
              >
                Chercher mecanique
                <FontAwesomeIcon icon={faSearch} size="lg" color="white" className="ml-2" />
              </button>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map(mechanic => (
                <MechanicCard key={mechanic._id} mechanic={mechanic} />
              ))}
            </div>
          </div>
        )}
      </SearchContext.Consumer>
    </SearchProvider>
  );
};

export default SearchBar;
