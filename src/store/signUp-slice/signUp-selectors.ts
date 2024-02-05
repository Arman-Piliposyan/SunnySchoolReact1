import { createSelector } from '@reduxjs/toolkit';

import { RootStateType } from '..';

const signUpSelector = (state: RootStateType) => state.signUp;

export const emailSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.email,
);

export const passwordSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.password,
);

export const confirmPasswordSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.confirmPassword,
);
