import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import AllTodos from './AllTodos';
import CompletedTodos from './CompletedTodos';
import ActiveTodos from './ActiveTodos';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'rgba(175, 47, 47, 0.55)',
        tabBarActiveBackgroundColor: '#fae8f2',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="home"
              color={'rgba(175, 47, 47, 0.55)'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="All"
        component={AllTodos}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="clipboard-list"
              color={'rgba(175, 47, 47, 0.55)'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Active"
        component={ActiveTodos}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="checkbox-multiple-blank-outline"
              color={'rgba(175, 47, 47, 0.55)'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedTodos}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="checkbox-multiple-marked"
              color={'rgba(175, 47, 47, 0.55)'}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
