import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import BookDetailScreen from '../screens/BookDetailScreen';

export type RootStackParamList = {
  Home: undefined;
  BookDetail: {
    book: {
      title: string;
      author: string;
      image: string;
      rating: number;
      pages: number;
      language: string;
      description: string;
    };
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
