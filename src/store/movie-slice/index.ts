import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IMovieData } from './../../pages/Movies/types';

type MovieStateType = {
  selectedMovie: IMovieData | null;
};

const initialState: MovieStateType = {
  selectedMovie: null,
};

const movieSlice = createSlice({
  reducers: {
    setSelectedMovie: (state, action: PayloadAction<IMovieData | null>) => {
      state.selectedMovie = action.payload;
    },
  },
  name: 'movie',
  initialState,
});

// eslint-disable-next-line no-empty-pattern
export const { setSelectedMovie } = movieSlice.actions;

export default movieSlice.reducer;
