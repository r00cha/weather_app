import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/locations';

function LocationSelector({ onSelectLocation: onSelectLocation }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(API_URL);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedLocation(value);

    // Pass `null` or "default" for the default option
    if (value === "") {
      onSelectLocation(null);
    } else {
      const location = locations.find((c) => c.name === value);
      onSelectLocation(location);
    }
  };

  return (
    <div>
      <label className="mb-1 text-lg font-medium text-gray-900">Select a location</label>
      <select value={selectedLocation} onChange={handleChange} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '>
        <option value="">-- Select one --</option>
        {locations.map((location) => (
          <option key={location.id} value={location.name}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LocationSelector;
