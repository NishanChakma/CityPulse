import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isLoggedIn: false,
  lang: 'English',
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
  },
});

export const { loginAction, logoutAction, setLang } = authSlice.actions;

export default authSlice.reducer;
