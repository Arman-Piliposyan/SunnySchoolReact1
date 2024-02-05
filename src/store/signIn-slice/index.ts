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

export const signUpSlice = createSlice({
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
  name: 'signUp',
  initialState,
});

// Action creators are generated for each case reducer function
export const { setPassword, setEmail } = signUpSlice.actions;

export default signUpSlice.reducer;
