import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import Home from '../screen/Home';
import Profile from '../screen/Profile';


import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const TabSrceen = () => {
  return (
    <Tab.Navigator
    tabBarOptions = {{
      showLabel : false
    }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" color={'#59B7C9'} size={28}
             />
          ),
    
        
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account"
              color={'#59B7C9'}
              size={28}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabSrceen;
