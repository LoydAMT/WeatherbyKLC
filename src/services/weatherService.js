import axios from 'axios';

const API_KEY = 'bc97ce1eeadb4be18513050ef64307bc'; 
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



export const getLocationWoeid = async (location) => {
  try {
    const response = await axios.get(`${BASE_URL}/current`, {
      params: {
        city: location,
        key: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
};
