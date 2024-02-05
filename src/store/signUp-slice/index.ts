import type { PayloadAction } from '@reduxjs/toolkit';

import { createSlice } from '@reduxjs/toolkit';

export interface SignInState {
  confirmPassword: string;
  password: string;
  email: string;
}

const signUpInitialState: SignInState = {
  confirmPassword: '',
  password: '',
  email: '',
};

export const signUpSlice = createSlice({
  reducers: {
    setSignUpState: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = signUpInitialState;
    },
    setSignUpConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setSignUpPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setSignUpEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  initialState: signUpInitialState,
  name: 'signUp',
});

export const {
  setSignUpConfirmPassword,
  setSignUpPassword,
  setSignUpState,
  setSignUpEmail,
} = signUpSlice.actions;

export default signUpSlice.reducer;
