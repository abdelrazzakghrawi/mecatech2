// SearchButton.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchButton = ({ onClick }) => (
  <div className='flex-shrink-0'>
    <button
      className="bg-[#1FA9B6] text-white px-8 py-6 hover:bg-[#148a94] flex items-center mt-4 md:mt-0  transition duration-300 ease-in-out transform "
      onClick={onClick}
    >
      Chercher mecanique
      <FontAwesomeIcon icon={faSearch} size="lg" color="white" className="ml-2" />
    </button>
  </div>
);

export default SearchButton;