import React, { useContext } from 'react';
import { SearchContext } from './context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faCity, faMapMarkerAlt, faTags } from '@fortawesome/free-solid-svg-icons';

const SearchSummary = () => {
  const { selectedCar, selectedCity, selectedQuartier, selectedCategory } = useContext(SearchContext);
  console.log(selectedCar, selectedCity, selectedQuartier, selectedCategory);

  const getDisplayValue = (value) => {
    if (value === null || value === undefined) return 'Not specified';
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        // Extract categories from the array of objects
        const categories = value.map(item => item.category).filter(Boolean);
        return categories.length > 0 ? categories.join(', ') : 'Not specified';
      }
      return value.marques || Object.values(value).join(', ') || 'Not specified';
    }
    return String(value);
  };

  return (
    <div style={{width:"87%"}} className="  bg-gradient-to-r from-[#1FA9B6]   to-[#148a94] p-4  shadow-md mb-4 text-white">
      <h2 className="text-xl font-semibold mb-3">Search Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white bg-opacity-20 p-3 rounded-md flex items-center">
          <FontAwesomeIcon icon={faCar} className="mr-2" />
          <span className="font-medium">Car:</span> {getDisplayValue(selectedCar)}
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-md flex items-center">
          <FontAwesomeIcon icon={faCity} className="mr-2" />
          <span className="font-medium">City:</span> {getDisplayValue(selectedCity)}
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-md flex items-center">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
          <span className="font-medium">Quartier:</span> {getDisplayValue(selectedQuartier)}
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-md flex items-center">
          <FontAwesomeIcon icon={faTags} className="mr-2" />
          <span className="font-medium">Category:</span> {getDisplayValue(selectedCategory)}
        </div>
      </div>
    </div>
  );
};

export default SearchSummary;