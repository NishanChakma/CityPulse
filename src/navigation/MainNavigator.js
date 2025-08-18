import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppRoutes from './AppRoutes';
import ProfileScreen from '../screens/ProfileScreen';
import HomeNavigator from './HomeNavigator';
import HomeIcon from '../assests/home.png';
import HomeIconActive from '../assests/homeActive.png';
import UserIcon from '../assests/user.png';
import UserIconActive from '../assests/userActive.png';
import { Image } from 'react-native';

const Tabs = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => {
          if (route.name === AppRoutes.HOMENAVIGATOR) {
            return focused ? (
              <Image
                source={HomeIconActive}
                style={{ height: 18, width: 18 }}
              />
            ) : (
              <Image source={HomeIcon} style={{ height: 18, width: 18 }} />
            );
          } else if (route.name === AppRoutes.PROFILESCREEN) {
            return focused ? (
              <Image
                source={UserIconActive}
                style={{ height: 18, width: 18 }}
              />
            ) : (
              <Image source={UserIcon} style={{ height: 18, width: 18 }} />
            );
          }
        },
        tabBarActiveTintColor: '#D72638',
        tabBarInactiveTintColor: '#999',
      })}
      initialRouteName={AppRoutes.HOME}
    >
      <Tabs.Screen
        name={AppRoutes.HOMENAVIGATOR}
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: '#D72638',
        }}
      />
      <Tabs.Screen
        name={AppRoutes.PROFILESCREEN}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: '#D72638',
        }}
      />
    </Tabs.Navigator>
  );
};

export default MainNavigator;
