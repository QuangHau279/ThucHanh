import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DetailListItem from './DetailListItem';
const Options = () => {
  return (
    <View style={styles.container}>
     <DetailListItem title= 'Update Profile'/>
     <DetailListItem title= 'Change Language'/>
     <DetailListItem title= 'Sign Out'/>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  option: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 16,
  },
});
