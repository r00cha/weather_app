import React, { useState } from "react";
import axios from "axios";
import LocationSelector from "./components/LocationSelector";
import WeatherChart from "./components/WeatherChart";
import DateRangePicker from "./components/DateRangePicker";
import WeatherTable from "./components/WeatherTable";
import LottieAnimation from "./components/LottieAnimation"; // Import the Lottie animation component

const API_URL = "http://localhost:3001/api/v1/weather";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [dateRange, setDateRange] = useState({
    start_date: "2024-03-06",
    end_date: "2024-03-09",
  });
  const [loading, setLoading] = useState(false); // New loading state

  const fetchWeather = async (location, start_date, end_date) => {
    setLoading(true); // Set loading to true when fetching starts
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
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
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
    <section className="h-screen grid grid-rows-[9rem_1fr] p-4 relative">
      {/* Header */}
      <header className="shadow-lg h-32 bg-[#fff] rounded-3xl flex items-center gap-4 px-4">
        <img src="/assets/weatherLogo.svg" alt="Logo" className="h-12" />
        <div className="flex items-center justify-center gap-3">
          <h1 className="text-5xl font-semibold">BreezeBuddy</h1>
          <h2 className="text-5xl font-normal"> - </h2>
          <h3 className="text-4xl font-normal">Your Weather Companion</h3>
        </div>
      </header>

      {/* Content */}
      <div className="grid grid-cols-4 gap-4 overflow-y-hidden">
        {/* Data Selection */}
        <div className="p-5 pt-8 shadow-xl rounded-3xl col-span-1 bg-[#fff] flex flex-col overflow-y-auto">
          <h1 className="mb-3 text-2xl font-semibold">Data Selection</h1>
          <p className="text-lg text-wrap">
            Choose a{" "}
            <span className="text-blue-500 font-semibold">location</span> and{" "}
            <span className="text-blue-500 font-semibold">date range</span> to
            get weather data
          </p>
          <LocationSelector onSelectLocation={handleSelectLocation} />
          <DateRangePicker onSelectRange={handleSelectDateRange} />
          <button
            onClick={handleFetchWeather}
            disabled={loading} // Disable the button while loading
            className={`text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Fetching..." : "Search"}
          </button>
        </div>

        {/* Data Display */}
        <div className="p-5 pt-8 shadow-xl rounded-3xl col-span-3 bg-[#fff] p-4 flex flex-col overflow-y-auto">
          <h1 className="text-2xl font-semibold">Data Display</h1>
          {weatherData ? (
            <div>
              <p className="text-lg mt-2">
                Weather information for
                <span className="font-semibold text-blue-500"> {selectedLocation.name} </span>
                (Latitude: <span className="font-semibold">{weatherData.latitude}</span>,
                Longitude: <span className="font-semibold">{weatherData.longitude}</span>)
                from <span className="font-semibold">{dateRange.start_date} </span>
                to <span className="font-semibold">{dateRange.end_date}</span>.
              </p>
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

      {/* Loading Spinner Modal */}
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </section>
  );
}

export default App;
