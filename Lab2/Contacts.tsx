// Contacts.tsx
import React, { useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../store';
import { fetchContacts } from '../utility/api';
import ContactThumbnail from '../Lab2/ContactThumbnail';
import { RootState } from '../store';
import { StackScreenProps } from '@react-navigation/stack';
import { ContactParamList } from '../type/type';
import { StyleSheet } from 'react-native';

import ContactListItem from './ContactListItem';

type ContactsScreenProps = StackScreenProps<ContactParamList, 'Contacts'>;

const Contacts = ({ navigation }: ContactsScreenProps) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);

  // Contacts.tsx
useEffect(() => {
  dispatch(fetchContactsLoading());
  fetchContacts()
    .then((contacts) => {
      console.log('API Response:', contacts); 
      dispatch(fetchContactsSuccess(contacts));
    })
    .catch((e) => {
      console.error('API Error:', e); 
      dispatch(fetchContactsError());
    });
}, [dispatch]);
const renderContact = ({ item }: { item: any }) => (
  <ContactListItem
    name={item.name}
    avatar={item.avatar}
    phone={item.phone}
    onPress={() => navigation.navigate('Profile', { contact: item })}
  />
);


  const sortContacts = [...contacts].sort((a, b) => a.name.localeCompare(b.name));

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error...</Text>;

  return (
    <View style={styles.container}>
      {(loading && <ActivityIndicator color="blue" size="large" />)}
      {(error && <Text>Error...</Text>)}
      {(!loading && !error && (
      <FlatList
        data={sortContacts}
        keyExtractor={(item) => item.phone}
        numColumns={1}
        renderItem={renderContact}
      />
    ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Contacts;