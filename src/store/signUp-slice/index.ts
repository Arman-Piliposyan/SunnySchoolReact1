import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export interface SignInState {
  confirmPassword: string;
  password: string;
  email: string;
}

export const signUpInitialState: SignInState = {
  confirmPassword: '',
  password: '',
  email: '',
};

export const signUpSlice = createSlice({
  reducers: {
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setSignUpState: (state, action: PayloadAction<SignInState>) => {
      state = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  initialState: signUpInitialState,
  name: 'signUp',
});

export const { setConfirmPassword, setSignUpState, setPassword, setEmail } =
  signUpSlice.actions;

export default signUpSlice.reducer;
