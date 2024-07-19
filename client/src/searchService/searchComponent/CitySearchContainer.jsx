import React, { useState } from 'react';
import CitySelect from './CitySelect';
import SearchInput from './SearchInput';

const CitySearchContainer = () => {
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <div className="flex items-center">
      <CitySelect onCityChange={setSelectedCity} />
      <SearchInput selectedCity={selectedCity} />
    </div>
  );
};

export default CitySearchContainer;
