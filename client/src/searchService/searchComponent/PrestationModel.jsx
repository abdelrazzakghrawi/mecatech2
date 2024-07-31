import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons'; // Import faSearch
import { SearchContext } from './context/SearchContext';

const PrestationModel = ({ onClose, onPrestationSelect }) => {
  const { selectedCategory } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/api/prestations/categories')
      .then(response => {
        const categoriesData = response.data.reduce((acc, current) => {
          Object.keys(current).forEach(key => {
            if (key) {
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(current[key]);
            }
          });
          return acc;
        }, {});
        setCategories(categoriesData);
        setFilteredCategories(categoriesData);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const handleCategoryClick = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = Object.keys(categories).reduce((acc, key) => {
      const filteredPrestations = categories[key].filter(prestation => prestation.toLowerCase().includes(searchValue));
      if (filteredPrestations.length > 0) {
        acc[key] = filteredPrestations;
      }
      return acc;
    }, {});
    
    setFilteredCategories(filtered);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
      <div className="bg-white shadow-lg w-full max-w-4xl relative   overflow-y-auto h-5/6">
       
        <div className="text-2xl font-semibold mb-6 text-center pt-8 pb-8 bg-teal-500 text-white py-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &#x2715;
        </button>
          Sélectionnez les interventions recherchées
        </div>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 border rounded"
            placeholder="Rechercher une prestation"
          />
          <button className="bg-teal-500 text-white px-4 py-2 rounded">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 ml-2 mr-2">
          {Object.keys(filteredCategories).map((category, index) => (
            <div key={index} className="border p-4 rounded">
              <div
                className="flex justify-between items-center cursor-pointer text-lg font-semibold"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
                <FontAwesomeIcon icon={expandedCategories[category] ? faMinus : faPlus} />
              </div>
              {expandedCategories[category] && (
                <div className="mt-4">
                  {filteredCategories[category].map((prestation, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer"
                      onClick={() => onPrestationSelect(prestation, category)}
                    >
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
        <div className="flex justify-center mt-4 mb-4">
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
