import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler } from '@fortawesome/free-solid-svg-icons';

const DistanceFilter = ({ distanceFilter, setDistanceFilter }) => (
  <div className="filter-container mt-4 bg-white p-4 rounded-lg shadow-md">
    <div className="filter-header flex items-center mb-2">
      <FontAwesomeIcon icon={faRuler} size="lg" className="text-gray-600 mr-2" />
      <label className="filter-label text-gray-700 text-sm font-bold" htmlFor="distance">
        Filter by distance (km):
      </label>
    </div>
    <input
      type="range"
      id="distance"
      name="distance"
      min="1"
      max="50"
      value={distanceFilter}
      onChange={(e) => setDistanceFilter(e.target.value)}
      className="filter-range w-full"
    />
    <div className="filter-range-marks flex justify-between text-gray-600 mt-1 text-sm">
      <span>1 km</span>
      <span>50 km</span>
    </div>
    <div className="filter-distance text-gray-700 mt-1 text-sm">Selected distance: {distanceFilter} km</div>
  </div>
);

export default DistanceFilter;