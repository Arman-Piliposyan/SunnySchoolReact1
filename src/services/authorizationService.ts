import { v4 as uuid } from 'uuid';
import axios from 'axios';

type signUpPostType = {
  password: string;
  email: string;
};

export const usersGet = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get('http://localhost:8000/users');
    return response;
  } catch (error) {
    throw error;
  }
};

export const signUpPost = async (data: signUpPostType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post('http://localhost:8000/users', {
      ...data,
      token: uuid(),
    });
    return response;
  } catch (error) {
    throw error;
  }
};
