import { configureStore } from '@reduxjs/toolkit';

import signInSlice from './signIn-slice';
import signUpSlice from './signUp-slice';

export const store = configureStore({
  reducer: {
    signUp: signUpSlice,
    signIn: signInSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
