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
      <h1>Select a Location</h1>
      <select value={selectedLocation} onChange={handleChange}>
        <option value="">-- Select a Location --</option>
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
