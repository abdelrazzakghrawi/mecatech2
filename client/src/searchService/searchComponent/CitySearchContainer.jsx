// src/components/CitySearchContainer.js

import React, { useState } from 'react';
import CitySelect from './CitySelect';
import SearchInput from './SearchInput';

const CitySearchContainer = () => {
    const [selectedCity, setSelectedCity] = useState('');

    return (
        <div className="container mx-auto p-4">
            <div className="flex items-center">
                <CitySelect onCityChange={setSelectedCity} />
                {selectedCity && <SearchInput selectedCity={selectedCity} />}
            </div>
        </div>
    );
};

export default CitySearchContainer;
