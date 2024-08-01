import React, { createContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedQuartier, setSelectedQuartier] = useState('');
  const [selectedCategory, setSelectedCategory] = useState([]);

  return (
    <SearchContext.Provider
      value={{
        selectedCar,
        setSelectedCar,
        selectedCity,
        setSelectedCity,
        selectedQuartier,
        setSelectedQuartier,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
