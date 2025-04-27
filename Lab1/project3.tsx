import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';


interface ButtonProps {
    text: string;
    onPress: () => void;
    buttonStyle?: ViewStyle;
}


const ButtonComponent = ({ text, onPress, buttonStyle }: ButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};


const Project3 = () => {
    return (
        <View style={styles.container}>
            <ButtonComponent 
                text="Nút thứ nhất" 
                onPress={() => alert("Bạn đã nhấn nút thứ nhất!")} 
            />
            <ButtonComponent 
                text="Nút thứ hai"
                onPress={() => alert("Bạn đã nhấn nút thứ hai!")}
                buttonStyle={{ backgroundColor: '#4dc2c2' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10,
        minWidth: 150,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default Project3;
