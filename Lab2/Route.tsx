import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacts from './Contacts'
import Profile from './Profile';
import colors from '../utility/colors';
import { ContactParamList } from '../type/type';
import Favorites from './Favorite';
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src';
import Icon from 'react-native-vector-icons/MaterialIcons';
import User from './User';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Options from './Options';
type UserScreenProps = StackScreenProps<ContactParamList, 'User'>;
const Stack = createNativeStackNavigator<ContactParamList>();
const getTabBarIcon = (icon: any) => ({ color }: { color: string }) => (
  <Icon name={icon} size={26} color={color} />
);

const ContactsScreens  = () => {
  return (
    
      <Stack.Navigator
        initialRouteName="Contacts"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{ title: 'Contacts' }}
      />
       
        <Stack.Screen
        name="Profile"
        component={Profile}
//route trong options={({ route }) => {...}} là tham số được React Navigation cung cấp truy cập thông tin của màn hình.
// route trong const { contact } = route.params ở profile sử dụng dữ liệu từ route để trích xuất thông tin cụ thể.
// Hai lần xuất hiện của route là ở hai phạm vi khác nhau: một là tham số hàm, một là truy cập thuộc tính.
        options={({ route: { params: { contact: { name } } } }) => ({
          title: name.split(' ')[0],
          headerTintColor: 'white',
          headerStyle: { backgroundColor: colors.blue },
        })}
      />
      </Stack.Navigator>
   
  );
};
const FavoritesScreens = () => {
  return (
    <Stack.Navigator initialRouteName="Favorite">
      <Stack.Screen
        name="Favorite"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Profile' }}
      />
     
    </Stack.Navigator>
  );
};

const UserScreens = ({ navigation }:UserScreenProps) => {
  return (
    <Stack.Navigator initialRouteName="User">
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Options" component={Options} options={{ title: 'Options' }} />
    </Stack.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="ContactsScreens"
        barStyle={{
          backgroundColor: colors.blue,
        }}
        labeled={true}
        activeTintColor={colors.greyLight}
        inactiveColor={colors.greyDark}
      >
        <Tab.Screen
          name="ContactsScreens"
          component={ContactsScreens}
          options={{
            tabBarIcon: getTabBarIcon('list'),
          }}
        />
        <Tab.Screen
          name="FavoritesScreens"
          component={FavoritesScreens}
          options={{
            tabBarIcon: getTabBarIcon('star'),
          }}
        />
        <Tab.Screen
          name="UserScreens"
          component={UserScreens}
          options={{
            tabBarIcon: getTabBarIcon('person'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
