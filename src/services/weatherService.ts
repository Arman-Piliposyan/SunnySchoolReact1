import axios from 'axios';

export const getWeather = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?lat=40.177516&lon=44.512638&appid=ae02c8a5620ce0f7ad39498d8d28710d',
    );
    return response;
  } catch (error) {
    throw error;
  }
};
