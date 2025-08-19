import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppRoutes from './AppRoutes';
import MainNavigator from './MainNavigator';
import AuthScreen from '../screens/AuthScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const isLogin = false;

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: { ...DarkTheme.colors, background: '#000000ff' },
      }}
    >
      <Stack.Navigator
        initialRouteName={isLogin ? AppRoutes.MAIN_ROUTE : AppRoutes.AUTHSCREEN}
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
