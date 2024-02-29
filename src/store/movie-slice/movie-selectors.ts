import { createSelector } from '@reduxjs/toolkit';

import { RootStateType } from '..';

const selector = (state: RootStateType) => state.movie;

export const movieSelector = createSelector(
  selector,
  (movie) => movie.selectedMovie,
);
