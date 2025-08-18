import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppRoutes from './AppRoutes';
import ProfileScreen from '../screens/ProfileScreen';

const Tabs = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tabs.Navigator screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name={AppRoutes.HOMESCREEN}
        component={HomeNavigator}
        options={{ tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tabs.Screen
        name={AppRoutes.PROFILESCREEN}
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tabs.Navigator>
  );
};

export default MainNavigator;
