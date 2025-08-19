import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: {},
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload.userInfo;
    },
    logoutAction: state => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginAction, logoutAction } = authSlice.actions;

export default authSlice.reducer;
