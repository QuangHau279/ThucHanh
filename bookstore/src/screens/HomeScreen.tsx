import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const books = [
  {
    id: '1',
    title: 'Xóm bờ dậu',
    image: require('../assets/dbe55aa228c0a03226c4b0e20814ad62.jpg'),
    days: '3d 5h',
    percent: '75%',
  },
  {
    id: '2',
    title: 'Dế mèn phiêu lưu ký',
    image: require('../assets/bia-sach2-9886.jpg'),
    days: '10d 5h',
    percent: '23%',
  },
  {
    id: '3',
    title: 'Đơn giản',
    image: require('../assets/f57618290309c16d952b67075d04c187.jpg'),
    days: '10d 5h',
    percent: '23%',
  },
  {
    id: '4',
    title: 'Chú chim tí hon',
    image: require('../assets/OIP.jpg'),
    days: '10d 5h',
    percent: '23%',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning</Text>
        <Text style={styles.username}>Hậu</Text>
        <TouchableOpacity style={styles.pointButton}>
          <Text style={styles.pointText}> 0 points</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>🎁 Claim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>💰 Get Point</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={styles.iconText}>💳 My Card</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bookList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.bookCard}
            onPress={() => navigation.navigate('BookDetail', { book: item })}
          >
            <Image source={item.image} style={styles.bookImage} />
            <Text style={styles.bookTitle} numberOfLines={1}>{item.title}</Text>
            <View style={styles.bookInfo}>
              <Text style={styles.bookMeta}>{item.days}</Text>
              <Text style={styles.bookMeta}>{item.percent}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.tabs}>
        <Text style={styles.tabActive}>Best Seller</Text>
        <Text style={styles.tab}>The Latest</Text>
        <Text style={styles.tab}>Coming Soon</Text>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 16 },
  header: { marginTop: 50 },
  greeting: { color: 'white', fontSize: 18 },
  username: { color: 'white', fontWeight: 'bold', fontSize: 22, marginTop: 4 },
  pointButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  pointText: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  iconButton: {
    backgroundColor: '#1F1F1F',
    paddingVertical: 14,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  iconText: { color: 'white', fontWeight: 'bold' },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookList: { paddingBottom: 10 },
  bookCard: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    width: 140,
  },
  bookImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  bookTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 8,
    fontSize: 14,
  },
  bookInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  bookMeta: { color: '#bbb', fontSize: 12 },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  tabActive: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  tab: { color: '#888', fontSize: 16 },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    borderTopWidth: 1,
    borderColor: '#333',
    paddingVertical: 14,
  },
  navItem: { color: 'white', fontSize: 22 },
});
