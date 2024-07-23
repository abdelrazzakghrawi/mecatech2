import React, { useState, useContext } from 'react';
import SearchBarButton from './PickCar';
import SearchBarModal from './PickCarModel';
import { SearchContext } from './context/SearchContext';

const PickCarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedCar } = useContext(SearchContext);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (selectedCar) => {
    setIsOpen(false);
    if (selectedCar) {
      setSelectedCar(selectedCar);
    }
  };

  return (
    <div className="flex-shrink-0">
      <SearchBarButton onOpen={handleOpen} />
      <SearchBarModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default PickCarContainer;
