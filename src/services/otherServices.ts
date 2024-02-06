import axios from 'axios';

export const getPosts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get('http://localhost:8000/posts');
    return response;
  } catch (error) {
    throw error;
  }
};
