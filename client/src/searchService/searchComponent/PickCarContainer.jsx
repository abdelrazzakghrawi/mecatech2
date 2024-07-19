import React, { useState } from 'react';
import SearchBarButton from './PickCar';
import SearchBarModal from './PickCarModel';

const PickCarContainer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex-shrink-0 ">
      <SearchBarButton onOpen={handleOpen} />
      <SearchBarModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default PickCarContainer;
