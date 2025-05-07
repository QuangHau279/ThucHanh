import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import ContactThumbnail from '../Lab2/ContactThumbnail';
import colors from '../utility/colors';
import { fetchUserContact } from '../utility/api';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContactParamList } from '../type/type';
import { useLayoutEffect } from 'react';
import { Pressable } from 'react-native';
interface User{
    id: string;
    name: string;
    avatar: string;
    phone: string;
    cell: string;
    email: string;
    favorite: boolean;
}
const User:React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ContactParamList>>();
  // Load du lieu
  useEffect(() => {
    fetchUserContact()
      .then(user => {
        setUser(user);
        setLoading(false);
        setError(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      });
  },[]);


  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Me',
      headerRight: () => (
        <Pressable style={{ marginRight: 16 }} onPress={() => navigation.navigate('Options')}>
          <Text style={{ fontSize: 24, color: 'white' }}>⋮</Text>
        </Pressable>
      ),
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: colors.blue,
      },
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && user && (
       <ContactThumbnail avatar={user.avatar} name={user.name} phone={user.phone} />
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
});

export default User;