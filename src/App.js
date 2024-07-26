import React, { useState, useEffect } from 'react';
import { getWeatherData } from './services/weatherService';
import './App.css'; // Import the CSS file

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Cebu');

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          console.log(`Fetching weather data for city: ${city}`);
          // Fetch weather data
          const weatherData = await getWeatherData(city);
          setWeather(weatherData);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching data:', err);
        }
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    const cityInput = document.getElementById('citytofind').value;
    if (cityInput) {
      setCity(cityInput);
      setWeather(null); // Reset weather state to show the loading state again
      setError(null); // Reset error state
    } else {
      console.log('City input is empty');
    }
  };

  if (error) return <div className="error">Error: {error}</div>;
  if (!weather) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input type='text' id="citytofind" placeholder='Enter your city here' />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {weather && (
        <div className="weather-info">
          <h1>Weather in {weather.city_name}</h1>
          <p>Temperature: {weather.temperature} °C</p>
          <p>Relative Humidity: {weather.relative_humidity} %</p>
          <p>Dew Point: {weather.dew_point} °C</p>
          <p>Apparent Temperature: {weather.apparent_temperature} °C</p>
          <p>Pressure: {weather.surface_pressure} hPa</p>
          <p>Cloud Cover: {weather.cloud_cover} %</p>
          <p>Wind Speed: {weather.wind_speed} km/h</p>
          <p>Wind Direction: {weather.wind_direction} °</p>
          <p>Precipitation: {weather.precipitation} mm</p>
          <p>Visibility: {weather.visibility} meters</p>
        </div>
      )}
    </div>
  );
};

export default App;





/* 
import React, { useState, useEffect } from 'react';
import { getWeatherData, getWeatherAlerts } from './services/weatherService';
import './App.css'; // Import the CSS file

const App = () => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Cebu');

  useEffect(() => {
    const fetchWeatherAndAlerts = async () => {
      if (city) {
        try {
          console.log(`Fetching weather data for city: ${city}`);
          // Fetch weather data
          const weatherData = await getWeatherData(city);
          setWeather(weatherData.data[0]);

          console.log(`Fetching weather alerts for city: ${city}`);
          // Fetch weather alerts
          const alertParams = { city: city };
          const alertData = await getWeatherAlerts(alertParams);
          setAlerts(alertData.alerts);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching data:', err);
        }
      }
    };

    fetchWeatherAndAlerts();
  }, [city]);

  const handleSearch = () => {
    const cityInput = document.getElementById('citytofind').value;
    if (cityInput) {
      setCity(cityInput);
      setWeather(null); // Reset weather state to show the loading state again
      setAlerts([]); // Reset alerts state
      setError(null); // Reset error state
    } else {
      console.log('City input is empty');
    }
  };

  if (error) return <div className="error">Error: {error}</div>;
  if (!weather) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input type='text' id="citytofind" placeholder='Enter your city here' />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {weather && (
        <div className="weather-info">
          <h1>Weather in {weather.city_name}</h1>
          <p>Temperature: {weather.temp} °C</p>
          <p>Weather: {weather.weather.description}</p>
        </div>
      )}

      <h2>Weather Alerts</h2>
      {alerts.length === 0 ? (
        <p>No alerts available.</p>
      ) : (
        alerts.map((alert, index) => (
          <div key={index} className="alert">
            <h3>{alert.title}</h3>
            <p>{alert.description}</p>
            <p><strong>Severity:</strong> {alert.severity}</p>
            <p><strong>Effective:</strong> {alert.effective_local}</p>
            <p><strong>Expires:</strong> {alert.expires_local}</p>
            <a href={alert.uri} target="_blank" rel="noopener noreferrer">More details</a>
          </div>
        ))
      )}
    </div>
  );
};

export default App;

*/