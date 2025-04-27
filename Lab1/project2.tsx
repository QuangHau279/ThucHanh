import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Project2() {
    return (
        <View style={MyStyle.container}>
            <Button title="Button 1" onPress={() => alert("hello!")} />
            <TouchableOpacity
                onPress={() => alert("hello 2!")}
                style={MyStyle.button}>
                <Text style={MyStyle.text}>Button 2</Text>
            </TouchableOpacity>
        </View>
    );
}

const MyStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: "blue",
        marginTop: 10,
        alignItems: "center",
        padding: 10
    },
    text: {
        color: "white",
        fontSize: 18
    }
});