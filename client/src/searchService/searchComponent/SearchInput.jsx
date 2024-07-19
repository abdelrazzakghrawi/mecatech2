import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const SearchInput = ({ selectedCity }) => {
  const [query, setQuery] = useState('');
  const [quartiers, setQuartiers] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (selectedCity) {
      fetch(`http://localhost:3003/api/villequartier/${selectedCity}/quartiers`)
        .then(response => response.json())
        .then(data => setQuartiers(data))
        .catch(error => console.error('Error fetching quartiers:', error));
    }
  }, [selectedCity]);

  useEffect(() => {
    if (query) {
      const filtered = quartiers.filter(q =>
        q.QUARTIER.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, quartiers]);

  const handleSuggestionClick = (quartier) => {
    setQuery(quartier);
    setSuggestions([]);
  };

  return (
    <div className="relative flex-grow">
      <label className="sr-only">Recherchez un quartier</label>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-l-0 rounded-r-lg focus:outline-none"
          placeholder="Tapez pour rechercher..."
        />
        <button className="bg-[#1FA9B6] text-white px-4 py-2 ">
          <FontAwesomeIcon icon={faMapMarkerAlt}   />

        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((s, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(s.QUARTIER)}
            >
              {s.QUARTIER}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
