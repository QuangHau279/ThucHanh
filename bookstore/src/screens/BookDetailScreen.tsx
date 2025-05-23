import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const BookDetailScreen = ({ route, navigation }) => {
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* ẢNH BÌA */}
      <Image source={book.image} style={styles.coverImage} />

      {/* THÔNG TIN CHÍNH */}
      <View style={styles.content}>
        <Text style={styles.title}>{book.title}</Text>

        <View style={styles.rowInfo}>
          <Text style={styles.infoText}>{book.days} left</Text>
          <Text style={styles.infoText}>Progress: {book.percent}</Text>
        </View>

        {/* NÚT ĐỌC */}
        <TouchableOpacity style={styles.readButton}>
          <Text style={styles.readText}>📖 Read Now</Text>
        </TouchableOpacity>

        {/* MÔ TẢ */}
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Đây là một mô tả ngắn về cuốn sách. Nổi bật đến các chi tiết hay của quyển sách.
        </Text>
      </View>
    </ScrollView>
  );
};

export default BookDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  coverImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  rowInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoText: {
    color: '#bbb',
    fontSize: 14,
  },
  readButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  readText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
});
