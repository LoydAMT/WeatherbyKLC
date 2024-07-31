import React, { useState, useEffect } from 'react';
import { getCoordinates, getWeatherData } from './services/weatherService';
import './App.css'; // Import the CSS file

const weatherCodeToCondition = (code) => {
  switch (code) {
    case 0: return 'clear'; // Clear sky
    case 1:
    case 2:
    case 3: return 'cloudy'; // Mainly clear, partly cloudy, and overcast
    case 45:
    case 48: return 'fog'; // Fog and depositing rime fog
    case 51:
    case 53:
    case 55: return 'drizzle'; // Drizzle: Light, moderate, and dense intensity
    case 56:
    case 57: return 'freezing-drizzle'; // Freezing Drizzle: Light and dense intensity
    case 61:
    case 63:
    case 65: return 'rain'; // Rain: Slight, moderate, and heavy intensity
    case 66:
    case 67: return 'freezing-rain'; // Freezing Rain: Light and heavy intensity
    case 71:
    case 73:
    case 75: return 'snow'; // Snow fall: Slight, moderate, and heavy intensity
    case 77: return 'snow grains'; // Snow grains
    case 80:
    case 81:
    case 82: return 'rain-showers'; // Rain showers: Slight, moderate, and violent
    case 85:
    case 86: return 'snow-showers'; // Snow showers slight and heavy
    case 95: return 'thunderstorm'; // Thunderstorm: Slight or moderate
    case 96:
    case 99: return 'thunderstorm-with-hail'; // Thunderstorm with slight and heavy hail
    default: return '';
  }
};

const App = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Cebu');

  useEffect(() => {
    const fetchWeather = async () => {
      if (city) {
        try {
          const { latitude, longitude } = await getCoordinates(city);
          const weatherData = await getWeatherData(latitude, longitude);
          setWeather({ ...weatherData, city });
        } catch (err) {
          setError(err.message);
        }
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = () => {
    const cityInput = document.getElementById('citytofind').value.trim();
    if (cityInput) {
      setCity(cityInput);
      setWeather(null); // Reset weather state to show the loading state again
      setError(null); // Reset error state
    } else {
      console.log('City input is empty');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherClass = (code) => {
    const condition = weatherCodeToCondition(code);
    switch (condition) {
      case 'rain': return 'raining';
      case 'snow': return 'snowing';
      case 'clear': return 'sunny';
      case 'cloudy': return 'cloudy';
      case 'fog': return 'fog';
      case 'drizzle': return 'drizzle';
      case 'freezing-drizzle': return 'freezing-drizzle';
      case 'freezing-rain': return 'freezing-rain';
      case 'rain-showers': return 'rain-showers';
      case 'snow-showers': return 'snow-showers';
      case 'thunderstorm': return 'thunderstorm';
      case 'thunderstorm-with-hail': return 'thunderstorm-with-hail';
      default: return '';
    }
  };

  const weatherClass = weather ? getWeatherClass(weather.weather_code) : '';

  if (error) return <div className="error">Error: {error}</div>;
  if (!weather) return <div className="loading">Loading...</div>;

  return (
    <div className={`app ${weatherClass}`}>
      <h1 className='Titles'>Weather App</h1>
      <div className="search-bar">
        <input type='text' id="citytofind" placeholder='Enter your city here' onKeyDown={handleKeyDown} />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      {weather && (
        <div className="weather-info">
          <h1 className='Titles'>Weather Information for {weather.city}</h1>
          <div className="weather-details">
            <div className="weather-location">
              <p><strong>Latitude:</strong> {weather.latitude}</p>
              <p><strong>Longitude:</strong> {weather.longitude}</p>
              <p><strong>Temperature:</strong> {weather.temperature} °C</p>
              <p><strong>Relative Humidity:</strong> {weather.relative_humidity} %</p>
              <p><strong>Dew Point:</strong> {weather.dew_point} °C</p>
              <p><strong>Visibility:</strong> {weather.visibility} meters</p>
            </div>
            <div className="weather-column">
              <p><strong>Apparent Temperature:</strong> {weather.apparent_temperature} °C</p>
              <p><strong>Pressure:</strong> {weather.surface_pressure} hPa</p>
              <p><strong>Cloud Cover:</strong> {weather.cloud_cover} %</p>
              <p><strong>Wind Speed:</strong> {weather.wind_speed} km/h</p>
              <p><strong>Wind Direction:</strong> {weather.wind_direction} °</p>
              <p><strong>Precipitation:</strong> {weather.precipitation} mm</p>
            </div>
          </div>
        </div>
      )}
      <div className={`video-container ${weatherClass}`}>
        {weatherClass === 'sunny' && (
          <iframe
            src="https://www.youtube.com/embed/ZJjYB-hWxMc?autoplay=1&mute=1&loop=1&playlist=ZJjYB-hWxMc"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Sunny Weather"
          ></iframe>
        )}
        {weatherClass === 'cloudy' && (
          <iframe
            src="https://www.youtube.com/embed/rRL_9WxBJBc?autoplay=1&mute=1&loop=1&playlist=rRL_9WxBJBc"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Cloudy Weather"
          ></iframe>
        )}
        {weatherClass === 'snowing' && (
          <iframe
            src="https://www.youtube.com/embed/vz91QpgUjFc?autoplay=1&mute=1&loop=1&playlist=vz91QpgUjFc"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Snow Weather"
          ></iframe>
        )}
        {weatherClass === 'thunderstorm' && (
          <iframe
            src="https://www.youtube.com/embed/gVKEM4K8J8A?autoplay=1&mute=1&loop=1&playlist=gVKEM4K8J8A"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Thunderstorm Weather"
          ></iframe>
        )}
        {weatherClass === 'raining' && (
          <iframe
            src="https://www.youtube.com/embed/3wFvFvVZkwY?autoplay=1&mute=1&loop=1&playlist=3wFvFvVZkwY"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Rain Weather"
          ></iframe>
        )}
      </div>
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