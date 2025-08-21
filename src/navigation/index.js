import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import AppRoutes from './AppRoutes';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import ShowMessage from '../hooks/ShowMessage';
import i18n from '../hooks/LanguageHooks';
import ReactNativeBiometrics from 'react-native-biometrics';
import { logoutAction } from '../store/slices/authSlice';

const Stack = createStackNavigator();
const auth = getAuth();
const BIOMETRIC_PROMPT = 'Authenticate to continue';

const RootNavigation = () => {
  const dispatch = useDispatch();
  // Redux state
  const {
    isLoggedIn,
    biometric: isBiometricEnabled,
    lang,
  } = useSelector(state => state?.auth || {});
  // Local state
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  /**Set app language from Redux state*/
  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang).catch(console.error);
    }
  }, [lang]);

  /**Auth state listener*/
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthChange);
    return () => unsubscribe(); // Cleanup
  }, [handleAuthChange]);

  /**Handle auth state change*/
  const handleAuthChange = useCallback(
    async firebaseUser => {
      if (!firebaseUser) {
        setUser(null);
        if (initializing) setInitializing(false);
        return;
      }

      if (isLoggedIn && isBiometricEnabled) {
        await authenticateWithBiometrics(firebaseUser);
      } else {
        setUser(firebaseUser);
        if (initializing) setInitializing(false);
      }
    },
    [isLoggedIn, isBiometricEnabled, initializing],
  );

  /** Biometric authentication logic */
  const authenticateWithBiometrics = async firebaseUser => {
    const rnBiometrics = new ReactNativeBiometrics();
    try {
      const { success } = await rnBiometrics.simplePrompt({
        promptMessage: BIOMETRIC_PROMPT,
      });

      if (success) {
        ShowMessage('Biometric authentication successful');
        setUser(firebaseUser);
      } else {
        await forceLogout('Authentication cancelled');
      }
    } catch (err) {
      console.error('Biometric error:', err);
      await forceLogout('Biometric authentication failed. Please try again.');
    } finally {
      if (initializing) setInitializing(false);
    }
  };

  //  Force logout and notify user
  const forceLogout = async message => {
    ShowMessage(message, true);
    await signOut(auth);
    dispatch(logoutAction());
    setUser(null);
  };

  if (initializing) return null;

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          background: '#000000ff',
        },
      }}
    >
      <Stack.Navigator
        initialRouteName={
          user && isLoggedIn ? AppRoutes.MAIN_ROUTE : AppRoutes.AUTHSCREEN
        }
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={AppRoutes.MAIN_ROUTE} component={MainNavigator} />
        <Stack.Screen name={AppRoutes.AUTHSCREEN} component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
