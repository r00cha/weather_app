import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/cities';

function CitySelector({ onSelectCity }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(API_URL);
        setCities(response.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleChange = (event) => {
    const city = cities.find(c => c.name === event.target.value);
    setSelectedCity(event.target.value);
    if (city) onSelectCity(city);
  };

  return (
    <div>
      <h1>Select a City</h1>
      <select value={selectedCity} onChange={handleChange}>
        <option value="">-- Select a City --</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}


function App() {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/weather', {
        params: {
          latitude: city.latitude,
          longitude: city.longitude,
          start_date: '2024-11-06',
          end_date: '2024-11-06',
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <CitySelector onSelectCity={fetchWeather} />
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
