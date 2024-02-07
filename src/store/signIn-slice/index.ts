import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export interface SignUpState {
  password: string;
  email: string;
}

const initialState: SignUpState = {
  password: '',
  email: '',
};

export const signInSlice = createSlice({
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setSignInState: (state) => {
      state.password = '';
      state.email = '';
    },
  },
  name: 'signUp',
  initialState,
});

export const { setSignInState, setPassword, setEmail } = signInSlice.actions;

export default signInSlice.reducer;
