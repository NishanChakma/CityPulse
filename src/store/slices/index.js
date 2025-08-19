import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import eventSlice from './eventSlice';

const allReducers = combineReducers({
  auth: authSlice,
  event: eventSlice,
});

const reducers = (state, action) => {
  if (action.type === 'auth/logoutAction') {
    return allReducers(undefined, action); // just reset state
  }
  return allReducers(state, action);
};

export default reducers;
