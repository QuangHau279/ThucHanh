import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const Placeholder = ({ label }: { label: string }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'white' }}>{label}</Text>
  </View>
);

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#1F1F1F',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#FF5722',
        tabBarInactiveTintColor: '#ccc',
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="Search" children={() => <Placeholder label="Search" />} options={{ tabBarLabel: 'Search', tabBarIcon: () => <Text>🔍</Text> }} />
      <Tab.Screen name="Notifications" children={() => <Placeholder label="Notifications" />} options={{ tabBarLabel: 'Alerts', tabBarIcon: () => <Text>🔔</Text> }} />
      <Tab.Screen name="Profile" children={() => <Placeholder label="Profile" />} options={{ tabBarLabel: 'Profile', tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
