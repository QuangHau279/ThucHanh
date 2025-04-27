import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const project1 = () => {
    return (
        <View style={MyStyle.ViewStyle}>
        <Text style={MyStyle.text}>Hello World</Text>
        </View>
        
    );
}
var MyStyle = StyleSheet.create({
    ViewStyle: {
      width:100,
      height: 100,
      backgroundColor:'aqua',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
        color: 'black',
    },
    
});
export default project1;
