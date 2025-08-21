import React from 'react';
import AppRoutes from './AppRoutes';
import { createStackNavigator } from '@react-navigation/stack';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import TabNavigator from './TabNavigator';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name={AppRoutes.TABNAVIGATOR} component={TabNavigator} />
      <Stack.Screen
        name={AppRoutes.EVENTDETAILSSCREEN}
        component={EventDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
