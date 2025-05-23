import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BookCardProps {
  title: string;
  image: string;
  progress: number;
  timeLeft: string;
  onPress: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ title, image, progress, timeLeft, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: image }} style={styles.image} />
    <Text numberOfLines={1} style={styles.time}>{timeLeft}</Text>
    <Text numberOfLines={1} style={styles.progress}>{progress}%</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  time: {
    color: 'white',
    marginTop: 4,
  },
  progress: {
    color: 'gray',
  },
});

export default BookCard;
