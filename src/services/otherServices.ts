import axios from 'axios';

import { PostType } from '../store/posts-slice';

export const getPosts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.get('http://localhost:8000/posts');
    return response;
  } catch (error) {
    throw error;
  }
};

export const addPost = async (data: PostType) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post('http://localhost:8000/posts', data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const editPost = async ({
  data,
  id,
}: {
  data: PostType;
  id: number;
}) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.put(`http://localhost:8000/posts/${id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (id: number) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.delete(`http://localhost:8000/posts/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
