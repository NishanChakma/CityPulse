import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppRoutes from './AppRoutes';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const RootNavigation = () => {
  const isLogin = true;

  return (
    <NavigationContainer
      theme={{
        ...DarkTheme,
        colors: { ...DarkTheme.colors, background: '#ffffffff' },
      }}
    >
      <Stack.Navigator
        initialRouteName={isLogin ? AppRoutes.MAIN_ROUTE : AppRoutes.ONBOARDING}
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen name={AppRoutes.MAIN_ROUTE} component={MainNavigator} />
        <Stack.Screen name={AppRoutes.ONBOARDING} component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
