import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppRoutes from './AppRoutes';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import i18n from '../hooks/LanguageHooks';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const isLoggedIn = useSelector(state => state?.auth?.isLoggedIn);
  const lang = useSelector(state => state?.auth?.lang);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function handleAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: { ...DarkTheme.colors, background: '#000000ff' },
      }}
    >
      <Stack.Navigator
        initialRouteName={
          user && isLoggedIn ? AppRoutes.MAIN_ROUTE : AppRoutes.AUTHSCREEN
        }
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name={AppRoutes.MAIN_ROUTE} component={MainNavigator} />
        <Stack.Screen name={AppRoutes.AUTHSCREEN} component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
