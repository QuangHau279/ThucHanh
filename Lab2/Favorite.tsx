// Favorites.tsx
import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ContactThumbnail from '../Lab2/ContactThumbnail';
import { RootState } from '../store';
import { StackScreenProps } from '@react-navigation/stack';
import { ContactParamList } from '../type/type';
import { StyleSheet } from 'react-native';
type FavoritesScreenProps = StackScreenProps<ContactParamList, 'Favorite'>;

const Favorites = ({ navigation }: FavoritesScreenProps) => {
  const { contacts, loading, error } = useSelector((state: RootState) => state.contacts);

  const favorites = contacts.filter((contact: any) => contact.favorite);

  const renderFavoriteThumbnail = ({ item }: { item: any }) => (
    <ContactThumbnail
      avatar={item.avatar}
      name={item.name}
      phone={item.phone}
      onPress={() => navigation.navigate('Profile', { contact: item })}
    />
  );

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
      <FlatList
      data={favorites}
      keyExtractor={(item) => item.phone}
      numColumns={2}
      renderItem={renderFavoriteThumbnail}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
      columnWrapperStyle={{
        justifyContent: 'space-around', 
        paddingHorizontal: 10, 
      }}
      ListFooterComponent={<View style={{ height: 80 }} />}
    />
    
    )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
  list: {
    paddingVertical: 16,
    paddingBottom: 100,
  },
});
export default Favorites;