import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchButton = ({ onClick }) => (
  <button
    className="bg-[#1FA9B6] text-white px-4 py-2 hover:bg-[#148a94] flex items-center mt-4 md:mt-0"
    onClick={onClick}
  >
    Chercher mecanique
    <FontAwesomeIcon icon={faSearch} size="lg" color="white" className="ml-2" />
  </button>
);

export default SearchButton;