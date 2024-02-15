import axios from 'axios';

import { PositionType } from '../pages/Weather/types';

export const getWeather = async (location: PositionType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=ae02c8a5620ce0f7ad39498d8d28710d&units=metric`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getWeekWeather = async (location: PositionType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=ae02c8a5620ce0f7ad39498d8d28710d&units=metric`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
