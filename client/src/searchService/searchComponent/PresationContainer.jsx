import React, { useContext, useState } from 'react';
import PrestationModel from './PrestationModel';
import { SearchContext } from './context/SearchContext'; // Import SearchContext

const PresationContainer = () => {
  const { selectedCategory, setSelectedCategory } = useContext(SearchContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrestationSelect = (prestation, category) => {
    const updatedCategory = [...selectedCategory]; // Create a copy of selectedCategory
  
    const categoryIndex = updatedCategory.findIndex(cat => cat === category);
  
    if (categoryIndex >= 0) {
      // Category exists
      const prestationIndex = updatedCategory[categoryIndex].prestations.indexOf(prestation);
  
      if (prestationIndex >= 0) {
        // Prestation exists, remove it
        updatedCategory[categoryIndex].prestations.splice(prestationIndex, 1);
        if (updatedCategory[categoryIndex].prestations.length === 0) {
          // Remove category if no prestations left
          updatedCategory.splice(categoryIndex, 1);
        }
      } else {
        // Prestation doesn't exist, add it
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
        className="bg-white text-black  border-solid border-t-2 border-b-2 px-4 py-2  hover:bg-[#1FA9B6]"
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