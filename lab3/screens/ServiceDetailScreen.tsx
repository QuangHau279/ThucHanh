import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ServiceDetailScreen = ({ route }: any) => {
  const { service } = route.params;
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      setIsAdmin(user.email === 'hau270903@gmail.com');
    }
  }, []);

  const handleDelete = async () => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa dịch vụ này?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await firestore().collection('services').doc(service.id).delete();
              Alert.alert('Thành công', 'Dịch vụ đã được xóa');
              navigation.goBack();
            } catch (error) {
              console.error(error);
              Alert.alert('Lỗi', 'Không thể xóa dịch vụ');
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e57373" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>
          <Text style={styles.bold}>Tên dịch vụ: </Text>
          {service.name}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Giá: </Text>
          {service.price?.toLocaleString('vi-VN')} đ
        </Text>
        {service.description && (
          <Text style={styles.label}>
            <Text style={styles.bold}>Mô tả: </Text>
            {service.description}
          </Text>
        )}
        <Text style={styles.label}>
          <Text style={styles.bold}>Người tạo: </Text>
          {service.creator || 'Không rõ'}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Ngày tạo: </Text>
          {service.createdAt?.toDate?.().toLocaleString('vi-VN') || 'Không có'}
        </Text>
        <Text style={styles.label}>
          <Text style={styles.bold}>Cập nhật: </Text>
          {service.updatedAt?.toDate?.().toLocaleString('vi-VN') || 'Không có'}
        </Text>
      </View>

      {isAdmin && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('AddService', { service })}
          >
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ServiceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    lineHeight: 24,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
