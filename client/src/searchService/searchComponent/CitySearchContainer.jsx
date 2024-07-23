import React, { useContext } from 'react';
import CitySelect from './CitySelect';
import SearchInput from './SearchInput';
import { SearchContext } from './context/SearchContext';

const CitySearchContainer = () => {
  const { selectedCity, setSelectedCity, setSelectedQuartier } = useContext(SearchContext);

  return (
    <div className="flex items-center">
      <CitySelect onCityChange={setSelectedCity} />
       <SearchInput selectedCity={selectedCity} onQuartierChange={setSelectedQuartier} />
    </div>
  );
};

export default CitySearchContainer;
