import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getPosts } from '../../services/otherServices';

type PostType = {
  title: string;
  body: string;
  id: number;
};

type PostsStateType = {
  posts: PostType[];
};

const initialState: PostsStateType = {
  posts: [],
};

export const postsGet = createAsyncThunk(
  'dashboard/posts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getPosts();
      return data;
    } catch (e) {
      return rejectWithValue('Something');
    }
  },
);

const postsSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(postsGet.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
  reducers: {},
  name: 'home',
  initialState,
});

// eslint-disable-next-line no-empty-pattern
export const {} = postsSlice.actions;

export default postsSlice.reducer;
