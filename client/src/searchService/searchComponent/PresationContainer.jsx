import React, { useState } from 'react';
import PrestationModel from './PrestationModel';

const PresationContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-black border-solid border-2 px-4 py-2 rounded hover:bg-[#1FA9B6]"
      >
        Show Categories
      </button>
      {isModalOpen && <PrestationModel onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default PresationContainer;
