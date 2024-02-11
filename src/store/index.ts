import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import signInSlice from './signIn-slice';
import signUpSlice from './signUp-slice';
import deviceSlice from './device-slice';
import postsSlice from './posts-slice';

export const store = configureStore({
  reducer: {
    device: deviceSlice,
    signUp: signUpSlice,
    signIn: signInSlice,
    posts: postsSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
