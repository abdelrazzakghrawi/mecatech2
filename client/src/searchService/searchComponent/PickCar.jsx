import React from 'react';

const PickCar = ({ onOpen, carName }) => {
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-center ">
        <button onClick={onOpen} className="bg-white text-black px-8 py-6 ">
          {carName || 'Choisissez un véhicule'}
        </button>
      </div>
    </div>
  );
};

export default PickCar;