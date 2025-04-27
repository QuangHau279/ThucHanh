import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


const App = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Button title="Bài 1" onPress={() => router.push('/(tabs)/project1')} />
            <Button title="Bài 2" onPress={() => router.push('/(tabs)/project2')} />
            <Button title="Bài 3" onPress={() => router.push('/(tabs)/project3')} />
            <Button title="Bài 4" onPress={() => router.push('/(tabs)/project4')} />       
            <Button title="Bài 5" onPress={() => router.push('/(tabs)/project5')} />
            <Button title="Bài 6" onPress={() => router.push('/(tabs)/project6')} />
            <Button title="Bài 7" onPress={() => router.push('/(tabs)/project7')} />
            <Button title="Bài 8" onPress={() => router.push('/(tabs)/project8')} />
            <Button title="Bài 9" onPress={() => router.push('/(tabs)/Calculator')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
});

export default App;
