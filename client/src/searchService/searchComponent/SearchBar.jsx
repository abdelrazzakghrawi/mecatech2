import React from 'react';
import PickCarContainer from './PickCarContainer';
import CitySearchContainer from './CitySearchContainer';
import PresationContainer from './PresationContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const SearchBar = () => {
  return (
    <div className="container mx-auto flex items-center  ">
      <PickCarContainer />
      <CitySearchContainer />
      <PresationContainer />
      <button className="bg-[#1FA9B6] text-white px-4 py-2   hover:bg-White-600">Chercher mecanique        <FontAwesomeIcon icon={faSearch} size="lg"  color="white" />
   
      </button>
      
    </div>
  );
};

export default SearchBar;
