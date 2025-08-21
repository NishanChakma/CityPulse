import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AppRoutes from './AppRoutes';
import ProfileScreen from '../screens/ProfileScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

// Icons
import HomeIcon from '../assets/home.png';
import HomeIconActive from '../assets/homeActive.png';
import UserIcon from '../assets/user.png';
import UserIconActive from '../assets/userActive.png';
import FavIcon from '../assets/fav.png';
import FavIconActive from '../assets/red.png';
import HomeScreen from '../screens/HomeScreen';

const Tabs = createBottomTabNavigator();

// Helper function for tab icons
const getTabBarIcon = (routeName, focused) => {
  const iconMapping = {
    [AppRoutes.HOMESCREEN]: {
      active: HomeIconActive,
      inactive: HomeIcon,
      size: { width: 18, height: 18 },
    },
    [AppRoutes.FAVORITESCREEN]: {
      active: FavIconActive,
      inactive: FavIcon,
      size: { width: 18, height: 20 },
    },
    [AppRoutes.PROFILESCREEN]: {
      active: UserIconActive,
      inactive: UserIcon,
      size: { width: 18, height: 18 },
    },
  };

  const { active, inactive, size } = iconMapping[routeName] || {};
  return (
    <Image
      source={focused ? active : inactive}
      style={size}
      resizeMode="contain"
    />
  );
};

const TabNavigator = () => {
  return (
    <Tabs.Navigator
      initialRouteName={AppRoutes.HOMESCREEN}
      screenOptions={({ route }) => ({
        headerShown: false,
        unmountOnBlur: true,
        tabBarIcon: ({ focused }) => getTabBarIcon(route.name, focused),
        tabBarActiveTintColor: '#D72638',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tabs.Screen
        name={AppRoutes.HOMESCREEN}
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tabs.Screen
        name={AppRoutes.FAVORITESCREEN}
        component={FavoriteScreen}
        options={{ tabBarLabel: 'Favourite' }}
      />
      <Tabs.Screen
        name={AppRoutes.PROFILESCREEN}
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tabs.Navigator>
  );
};

export default TabNavigator;
