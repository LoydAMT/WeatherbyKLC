import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        latitude: 10.3157, // Latitude for Cebu
        longitude: 123.8854, // Longitude for Cebu
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
        timezone: 'Asia/Manila'
      }
    });

    if (response.data && response.data.hourly) {
      const weatherData = response.data.hourly;
      return {
        city_name: city,
        temperature: weatherData.temperature_2m[0],
        relative_humidity: weatherData.relative_humidity_2m[0],
        dew_point: weatherData.dew_point_2m[0],
        apparent_temperature: weatherData.apparent_temperature[0],
        surface_pressure: weatherData.surface_pressure[0],
        cloud_cover: weatherData.cloud_cover[0],
        wind_speed: weatherData.wind_speed_10m[0],
        wind_direction: weatherData.wind_direction_10m[0],
        precipitation: weatherData.precipitation[0],
        visibility: weatherData.visibility[0]
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
