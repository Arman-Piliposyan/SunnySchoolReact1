import { createSelector } from '@reduxjs/toolkit';

import { RootStateType } from '..';

const signUpSelector = (state: RootStateType) => state.signIn;

export const signInEmailSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.email,
);

export const signInPasswordSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.password,
);
