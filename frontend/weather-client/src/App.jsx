import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain.toLowerCase()) {
      case "clear":
        return "/icons/clear.png";
      case "overcast clouds":
        return "/icons/clo.png";
      case "clouds":
        return "/icons/cloudy.png";
      case "rain":
        return "/icons/rain.png";
      default:
        return "/icons/default.png";
    }
  };

  const getWeatherCity = async (query) => {
    if (!query) return;

    try {
      const res = await fetch(
        `https://weatherapp-5wyp.onrender.com/api/city-suggestions?name=${query}`
      );

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const text = await res.text();
      const data = text ? JSON.parse(text) : [];

      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };



  const getWeather = async () => {
    if (!city) return setError("Please enter a city name.");
    setLoading(true);
    setError(null)
    try {
      const res = await fetch(`${baseURL}/api/weather?city=${city}`);
      const data = await res.json();
       if (!res.ok || !data || data.cod === "404" || !data.weather) {
         setWeatherData(null);
         setError(
           "Weather data not available for this city. It may not be supported by the API."
         );
       } else {
         setWeatherData(data);
         setError("");
       }
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Failed to fetch weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-blue-950 text-white flex items-center justify-center h-screen px-4">
      <div className="bg-sky-400 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4 relative">
        <h1 className="text-3xl font-bold text-blue-950">Weather App</h1>
        <div className="flex gap-2 justify-center relative w-full">
          <div className="w-full relative">
            <input
              className="border-gray-300 rounded bg-white px-4 py-2 w-full text-black border-2 mt-1.5"
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                getWeatherCity(e.target.value);
              }}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute bg-white text-black mt-1 rounded w-full shadow-lg z-10 max-h-60 overflow-y-auto">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => {
                      setCity(item.name);
                      setSuggestions([]);
                      setShowSuggestions(false);
                    }}
                  >
                    {item.name}, {item.countryCode}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            className="bg-black hover:bg-red-700 text-white px-8 mt-1.5 rounded-lg border-2"
            onClick={getWeather}
          >
            Find
          </button>
        </div>
        {error && <p className="text-blue-950 font-semibold">{error}</p>}
        {loading && (
          <div className="text-blue-950 font-semibold mt-4">
            <div>
              <p>Waking up server, please wait...</p>
              <p className="text-sm text-red-950">
                If it takes too long, try refreshing the page...
              </p>
            </div>
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-black ml-44 mt-6"></div>
        
          </div>
        )}
        

        {weatherData && weatherData.sys && (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded shadow text-sm text-blue-600 col-span-2 flex flex-col items-center font-bold">
              <img
                src={getWeatherIcon(weatherData.weather[0].main)}
                alt="Weather icon"
                className="w-20 h-20"
              />
              <h2 className="text-xl font-semibold">
                {weatherData.name}, {weatherData.sys.country}
              </h2>
              <p className="capitalize">{weatherData.weather[0].description}</p>
            </div>

            <div className="bg-black p-3 rounded shadow text-sm">
              🌡️ Temp: {weatherData.main.temp}°C
            </div>

            <div className="bg-black p-3 rounded shadow text-sm">
              ☀️ Feels Like: {weatherData.main.feels_like}°C
            </div>

            <div className="bg-black p-3 rounded shadow text-sm">
              💧 Humidity: {weatherData.main.humidity}%
            </div>

            <div className="bg-black p-3 rounded shadow text-sm">
              📈 Pressure: {weatherData.main.pressure} hPa
            </div>

            <div className="bg-black p-3 rounded shadow text-sm">
              🌬️ Wind Speed: {weatherData.wind.speed} m/s
            </div>

            <div className="bg-black p-3 rounded shadow text-sm">
              🧭 Wind Direction: {weatherData.wind.deg}°
            </div>

            <div className="bg-black p-3 rounded shadow text-sm col-span-2 text-center">
              🕓 Time: {new Date(weatherData.dt * 1000).toLocaleTimeString()}
            </div>

            <div className="bg-black p-3 rounded shadow text-sm col-span-2 text-center">
              🕰️ Time of Day:{" "}
              {new Date().getHours() < 12
                ? "Morning"
                : new Date().getHours() < 18
                ? "Afternoon"
                : "Evening"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
