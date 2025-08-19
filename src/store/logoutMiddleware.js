import { logoutAction } from './slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const logoutMiddleware = () => next => action => {
  if (action.type === logoutAction.type) {
    // Clear storage here instead of reducer (if needed again
    AsyncStorage.clear();
  }
  return next(action);
};

export default logoutMiddleware;
