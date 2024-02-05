import { createSelector } from '@reduxjs/toolkit';

import { RootStateType } from '..';

const signUpSelector = (state: RootStateType) => state.signUp;

export const signUpEmailSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.email,
);

export const signUpPasswordSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.password,
);

export const signUpConfirmPasswordSelector = createSelector(
  signUpSelector,
  (signUp) => signUp.confirmPassword,
);
