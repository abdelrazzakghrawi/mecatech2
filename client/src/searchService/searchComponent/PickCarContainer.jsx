import React, { useState, useContext } from 'react';
import PickCar from './PickCar';
import PickCarModel from './PickCarModel';
import { SearchContext } from './context/SearchContext';

const PickCarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCar, setSelectedCar } = useContext(SearchContext);
  const [carName, setCarName] = useState('');

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (selectedCar) => {
    setIsOpen(false);
    if (selectedCar) {
      setSelectedCar(selectedCar);
      setCarName(`${selectedCar.marques} ${selectedCar.model} `);
    }
  };

  return (
    <div className="flex-shrink-0 ">
      <PickCar onOpen={handleOpen} carName={carName} />
      <PickCarModel isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default PickCarContainer;