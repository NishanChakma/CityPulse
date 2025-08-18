import { createStackNavigator } from '@react-navigation/stack';
import AppRoutes from './AppRoutes';
import HomeScreen from '../screens/HomeScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={AppRoutes.HOMESCREEN} component={HomeScreen} />
      <Stack.Screen
        name={AppRoutes.EVENTDETAILSSCREEN}
        component={EventDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
