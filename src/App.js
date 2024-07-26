import React, { useState, useEffect } from 'react';
import { getWeatherData, getWeatherAlerts } from './services/weatherService';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');

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

  if (error) return <div>Error: {error}</div>;
  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h1>Weather App</h1>
      <input type='text' id="citytofind" placeholder='Enter your city here' />
      <button onClick={handleSearch}>Search</button>
      
      {weather && (
        <div>
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
          <div key={index}>
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
