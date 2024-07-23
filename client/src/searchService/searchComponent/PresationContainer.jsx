import React, { useContext, useState } from 'react';
import PrestationModel from './PrestationModel';
import { SearchContext } from './context/SearchContext'; // Import SearchContext

const PresationContainer = () => {
  const { selectedCategory, setSelectedCategory } = useContext(SearchContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrestationSelect = (prestation, category) => {
    const updatedCategory = [...selectedCategory]; // Copy selectedCategory
    const categoryIndex = updatedCategory.findIndex(cat => cat === category);

    if (categoryIndex >= 0) {
      // Category already exists, toggle existing prestation
      const prestationIndex = updatedCategory[categoryIndex].prestations.findIndex(
        p => p === prestation
      );
      if (prestationIndex >= 0) {
        updatedCategory[categoryIndex].prestations.splice(prestationIndex, 1);
      } else {
        updatedCategory[categoryIndex].prestations.push(prestation);
      }
    } else {
      // New category, add with selected prestation
      updatedCategory.push({ category, prestations: [prestation] });
    }

    setSelectedCategory(updatedCategory);
  };

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-black border-solid border-2 px-4 py-2 rounded hover:bg-[#1FA9B6]"
      >
        Show Categories
      </button>
      {isModalOpen && (
        <PrestationModel
        onClose={() => setIsModalOpen(false)}
        onPrestationSelect={handlePrestationSelect} // Pass handlePrestationSelect
        setSelectedCategory={setSelectedCategory} // New prop
      />
      )}
    </div>
  );
};

export default PresationContainer;