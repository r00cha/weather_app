import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await axios.get('http://localhost:3001/weather', {
        params: {
          latitude: '38.7167', // Example latitude for Lisbon
          longitude: '-9.1333', // Example longitude for Lisbon
          start_date: '2024-11-17',
          end_date: '2024-11-18',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <button onClick={fetchWeather}>Get Weather</button>
      {weatherData && (
        <div>
          <h2>Weather Data</h2>
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
