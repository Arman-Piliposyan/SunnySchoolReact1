import axios from 'axios';

import { IAddMovieData } from '../pages/Movies/types';

export const moviesGet = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get('http://localhost:8000/movies');
    return response;
  } catch (error) {
    throw error;
  }
};

export const addMoviePost = async (data: IAddMovieData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post('http://localhost:8000/movies', data);
    return response;
  } catch (error) {
    throw error;
  }
};
