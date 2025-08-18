import { createStackNavigator } from '@react-navigation/stack';
import AppRoutes from './AppRoutes';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={AppRoutes.LOGINSCREEN} component={LoginScreen} />
      <Stack.Screen name={AppRoutes.SIGNUPSCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
