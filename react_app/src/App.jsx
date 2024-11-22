import React, { useState } from 'react';
import axios from 'axios';
import LocationSelector from './components/LocationSelector';

const API_URL = 'http://localhost:3001/api/v1/weather';

function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const fetchWeather = async (location, start_date, end_date) => {
    try {

      const response = await axios.get(API_URL, {
        params: {
          location: location.name,
          start_date: start_date,
          end_date: end_date
        },
      });

      setWeatherData(response.data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }

  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleFetchWeather = () => {
    if (!selectedLocation) {
      alert('Please select a valid location first!');
    } else {
      fetchWeather(selectedLocation);
    }
  };

  return (
    <div>
      <LocationSelector onSelectLocation={handleSelectLocation} />
      <button onClick={handleFetchWeather}>Search</button>
      {weatherData && (
        <div>
          <h1>Weather Data</h1>
          <p>Latitude: {weatherData.latitude}</p>
          <p>Longitude: {weatherData.longitude}</p>
          <h3>Hourly Data</h3>
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Temperature (°C)</th>
              </tr>
            </thead>
            <tbody>
              {weatherData.hourly.time.map((time, index) => (
                <tr key={index}>
                  <td>{time}</td>
                  <td>{weatherData.hourly.temperature_2m[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
export default App;
