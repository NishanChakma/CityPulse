import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  lang: 'en',
  biometric: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logoutAction: state => {
      state.isLoggedIn = false;
    },
    setLang: (state, action) => {
      state.lang = action.payload;
    },
    setBiometric: (state, action) => {
      state.biometric = action.payload;
    },
  },
});

export const { loginAction, logoutAction, setLang, setBiometric } =
  authSlice.actions;

export default authSlice.reducer;
