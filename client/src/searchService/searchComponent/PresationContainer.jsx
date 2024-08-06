import React, { useContext, useState } from 'react';
import PrestationModel from './PrestationModel';
import { SearchContext } from './context/SearchContext';

const PresationContainer = () => {
  const { selectedCategory, setSelectedCategory } = useContext(SearchContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrestationSelect = (prestation, category) => {
    const updatedCategory = [...selectedCategory];
    const categoryIndex = updatedCategory.findIndex(cat => cat.category === category);

    if (categoryIndex >= 0) {
      const prestationIndex = updatedCategory[categoryIndex].prestations.indexOf(prestation);

      if (prestationIndex >= 0) {
        updatedCategory[categoryIndex].prestations.splice(prestationIndex, 1);
        if (updatedCategory[categoryIndex].prestations.length === 0) {
          updatedCategory.splice(categoryIndex, 1);
        }
      } else {
        updatedCategory[categoryIndex].prestations.push(prestation);
      }
    } else {
      updatedCategory.push({ category, prestations: [prestation] });
    }

    setSelectedCategory(updatedCategory);
  };

  return (
    <div className="flex-shrink-0">
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-black   px-8 py-6 hover:bg-[#1FA9B6]"
      >
        Show Categories
      </button>
      {isModalOpen && (
        <PrestationModel
          onClose={() => setIsModalOpen(false)}
          onPrestationSelect={handlePrestationSelect}
          setSelectedCategory={setSelectedCategory}
        />
      )}
    </div>
  );
};

export default PresationContainer;
