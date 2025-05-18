import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const AddServiceScreen = ({ route }: any) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();
  const isEditing = route.params?.service;

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const isUserAdmin = user.email === 'hau270903@gmail.com';
      setIsAdmin(isUserAdmin);
      if (!isUserAdmin) {
        Alert.alert('Lỗi', 'Bạn không có quyền thực hiện chức năng này');
        navigation.goBack();
      }
    }

    // If editing, populate the form
    if (isEditing) {
      setName(isEditing.name);
      setPrice(isEditing.price.toString());
      setDescription(isEditing.description || '');
    }
  }, [isEditing, navigation]);

  const validateInputs = () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên dịch vụ');
      return false;
    }
    if (name.trim().length < 3) {
      Alert.alert('Lỗi', 'Tên dịch vụ phải có ít nhất 3 ký tự');
      return false;
    }
    const priceValue = parseInt(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Lỗi', 'Giá dịch vụ phải lớn hơn 0');
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!isAdmin) {
      Alert.alert('Lỗi', 'Bạn không có quyền thực hiện chức năng này');
      return;
    }

    if (!validateInputs()) return;

    setLoading(true);
    try {
      const serviceData = {
        name: name.trim(),
        price: parseInt(price),
        description: description.trim(),
        creator: auth().currentUser?.email || 'Unknown',
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      if (isEditing) {
        await firestore().collection('services').doc(isEditing.id).update(serviceData);
        Alert.alert('Thành công', 'Dịch vụ đã được cập nhật');
      } else {
        await firestore().collection('services').add({
          ...serviceData,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert('Thành công', 'Dịch vụ đã được thêm');
      }
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', isEditing ? 'Không thể cập nhật dịch vụ' : 'Không thể thêm dịch vụ');
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}</Text>

      <Text style={styles.label}>Tên dịch vụ *</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập tên dịch vụ"
        value={name}
        onChangeText={setName}
        maxLength={50}
      />

      <Text style={styles.label}>Giá *</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập giá dịch vụ"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Mô tả</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Nhập mô tả dịch vụ"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        maxLength={200}
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleAdd}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>{isEditing ? 'Cập nhật' : 'Thêm'}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e57373',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#e57373',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
