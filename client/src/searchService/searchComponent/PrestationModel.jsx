import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  { useContext } from 'react';
import { SearchContext } from './context/SearchContext';

const PrestationModel = ({ onClose, onPrestationSelect ,  setSelectedCategory }) => {
const { selectedCategory } = useContext(SearchContext); // Access selectedCategory

  const [categories, setCategories] = useState([]);
  const [prestations, setPrestations] = useState({});
  const [expandedCategory, setExpandedCategory] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3003/api/prestations/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category) => {
    if (prestations[category]) {
      setExpandedCategory(null);
    } else {
      axios.get(`http://localhost:3003/api/prestations/${category}/prestations`)
        .then(response => {
          const prestationData = response.data.map(item => item.Prestations);
          setPrestations(prev => ({ ...prev, [category]: prestationData }));
        })
        .catch(error => console.error(`Error fetching prestations for ${category}:`, error));
      setExpandedCategory(category);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
      <div className="bg-white  max-w-4xl mt-8  p-8 rounded-lg shadow-lg relative h-screen overflow-y-auto">
        <div className="text-2xl font-semibold mb-6  text-center bg-teal-500 text-white py-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            &#x2715;
          </button>
          Sélectionnez les interventions recherchées
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            className="w-full max-w-md px-4 py-2 border rounded"
            placeholder="Rechercher une prestation"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="border p-4 rounded">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category}</span>
                <span>{expandedCategory === category ? '-' : '+'}</span>
              </div>
              {expandedCategory === category && prestations[category] && (
                <div className="mt-4">
                  {prestations[category].map((prestation, prestationIndex) => (
                    <div key={prestationIndex} className="flex items-center">
                      <input
                        type="checkbox"
                        id={prestation}
                        className="mr-2"
                        checked={selectedCategory.some(cat => cat.category === category && cat.prestations.includes(prestation))}
                        onChange={() => onPrestationSelect(prestation, category)}
                      />
                      <label htmlFor={prestation}>{prestation}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-teal-500 text-white px-6 py-2 rounded-md hover:bg-teal-600"
          >
            VALIDER MA SELECTION
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrestationModel;
