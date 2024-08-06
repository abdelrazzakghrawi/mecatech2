import React from 'react';
import MechanicCard from './MechanicCard';

const ResultsGrid = ({ filteredResults, userLocation }) => (
  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredResults.map(mechanic => (
      <MechanicCard key={mechanic._id} mechanic={mechanic} userLocation={userLocation} />
    ))}
  </div>
);

export default ResultsGrid;