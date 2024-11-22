import React, { useState } from "react";
import axios from "axios";
import LocationSelector from "./components/LocationSelector";
import WeatherChart from "./components/WeatherChart";
import DateRangePicker from "./components/DateRangePicker";
import WeatherTable from "./components/WeatherTable";
import LottieAnimation from "./components/LottieAnimation"; // Import the new component

const API_URL = "http://localhost:3001/api/v1/weather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dateRange, setDateRange] = useState({
    start_date: "2024-11-06",
    end_date: "2024-11-09",
  });

  const fetchWeather = async (location, start_date, end_date) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          location: location.name,
          start_date: start_date,
          end_date: end_date,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleSelectDateRange = (range) => {
    setDateRange(range);
  };

  const handleFetchWeather = () => {
    if (!selectedLocation) {
      alert("Please select a valid location first!");
    } else if (!dateRange.start_date || !dateRange.end_date) {
      alert("Please select a valid date range first!");
    } else {
      fetchWeather(selectedLocation, dateRange.start_date, dateRange.end_date);
    }
  };

  return (
    <section className="h-screen grid grid-rows-[9rem_1fr] p-4">
      <header className="shadow-lg h-32 bg-[#fff] rounded-3xl flex items-center gap-4 px-4">
        <img src="/assets/weatherLogo.svg" alt="Logo" className="h-12" />
        <h1 className="text-5xl font-semibold">Weather App</h1>
      </header>

      <div className="grid grid-cols-4 gap-4 overflow-y-hidden">

        {/* DATA SELECTION DIV */}
        <div className="shadow-xl rounded-3xl col-span-1 bg-[#fff] p-4 flex flex-col overflow-y-auto">
          <h1 className="text-2xl font-semibold">Data Selection</h1>
          <p className="text-lg text-wrap">
            Select a location and date range to get weather data
          </p>
          <LocationSelector onSelectLocation={handleSelectLocation} />
          <DateRangePicker onSelectRange={handleSelectDateRange} />
          <button
            onClick={handleFetchWeather}
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Search
          </button>
        </div>

        {/* DATA DISPLAY DIV */}
        <div className="shadow-xl rounded-3xl col-span-3 bg-[#fff] p-4 flex flex-col overflow-y-auto">
          <h1 className="text-2xl font-semibold">Data Display</h1>
          {weatherData ? (
            <div>
              <h1 className="text-xl font-semibold mt-4">Weather Data</h1>
              <p>Latitude: {weatherData.latitude}</p>
              <p>Longitude: {weatherData.longitude}</p>
              <WeatherChart hourlyData={weatherData.hourly} />
              <WeatherTable hourlyData={weatherData.hourly} />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">

              <LottieAnimation
                animationPath="/assets/noData.json"
                className="h-[35em] flex items-center justify-center"
              />

              <h2 className="text-xl font-semibold mt-4">
                No weather data available, make a search

              </h2>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
