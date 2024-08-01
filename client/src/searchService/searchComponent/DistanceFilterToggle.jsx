import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';

const DistanceFilterToggle = ({ filterEnabled, setFilterEnabled }) => (
  <div className="flex items-center mt-4">
    <FontAwesomeIcon
      icon={filterEnabled ? faToggleOn : faToggleOff}
      size="2x"
      className="text-gray-600 cursor-pointer mr-2"
      onClick={() => setFilterEnabled(!filterEnabled)}
    />
    <span className="text-gray-700 text-sm font-bold">
      {filterEnabled ? 'Disable' : 'Enable'} Distance Filter
    </span>
  </div>
);

export default DistanceFilterToggle;