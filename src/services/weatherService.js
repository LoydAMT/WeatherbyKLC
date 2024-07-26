import axios from 'axios';

const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

export const getCoordinates = async (city) => {
  try {
    const response = await axios.get(NOMINATIM_BASE_URL, {
      params: {
        q: city,
        format: 'json',
        limit: 1,
      },
    });

    if (response.data.length > 0) {
      const location = response.data[0];
      return { latitude: location.lat, longitude: location.lon };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

export const getWeatherData = async (latitude, longitude) => {
  try {
    const response = await axios.get(WEATHER_BASE_URL, {
      params: {
        latitude,
        longitude,
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'dew_point_2m',
          'apparent_temperature',
          'surface_pressure',
          'cloud_cover',
          'wind_speed_10m',
          'wind_direction_10m',
          'precipitation',
          'visibility'
        ].join(','),
        timezone: 'auto',
      },
    });

    if (response.data && response.data.hourly) {
      const weatherData = response.data.hourly;
      return {
        temperature: weatherData.temperature_2m[0],
        relative_humidity: weatherData.relative_humidity_2m[0],
        dew_point: weatherData.dew_point_2m[0],
        apparent_temperature: weatherData.apparent_temperature[0],
        surface_pressure: weatherData.surface_pressure[0],
        cloud_cover: weatherData.cloud_cover[0],
        wind_speed: weatherData.wind_speed_10m[0],
        wind_direction: weatherData.wind_direction_10m[0],
        precipitation: weatherData.precipitation[0],
        visibility: weatherData.visibility[0],
      };
    } else {
      throw new Error('Invalid response from weather API');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};



/*
import axios from 'axios';

const API_KEY = 'bc97ce1eeadb4be18513050ef64307bc'; // Replace with your actual API key
const BASE_URL = 'https://api.weatherbit.io/v2.0';
const ALERTBASE_URL = 'https://api.weatherbit.io/v2.0/alerts';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/current`, {
      params: {
        city: city,
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherAlerts = async (params) => {
  try {
    const response = await axios.get(ALERTBASE_URL, {
      params: {
        key: API_KEY,
        ...params
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather alerts:', error.message);
    throw error;
  }
};

*/
