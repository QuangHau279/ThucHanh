import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

type Props = {
  navigation: NativeStackNavigationProp<any>;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ Email và Mật khẩu');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
  .then(userCredential => {
    const uid = userCredential.user.uid;
    // Lưu tên vào Firestore collection "users"
    return firestore()
      .collection('users')
      .doc(uid)
      .set({
        name: name,
        email: email,
      });
  })
      .then(() => {
        Alert.alert('Thành công', 'Tạo tài khoản thành công');
        navigation.navigate('LoginScreen');
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Lỗi', 'Tạo tài khoản thất bại');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
              <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
      <TextInput
        placeholder="Mật khẩu"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Đăng ký" onPress={handleRegister} />
      <Text style={styles.loginLink} onPress={() => navigation.navigate('LoginScreen')}>
        Đã có tài khoản? Đăng nhập
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 15 },
  loginLink: { color: 'blue', textAlign: 'center', marginTop: 15 },
});

export default RegisterScreen;
