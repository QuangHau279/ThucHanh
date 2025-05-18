import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Image,
  ActivityIndicator, RefreshControl,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const ServiceScreen = () => {
  const [name, setName] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation<any>();

  const fetchUserData = async () => {
    try {
      const user = auth().currentUser;
      if (user) {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          setName(doc.data()?.name || '');
        }
        // Check if user is admin
        setIsAdmin(user.email === 'hau270903@gmail.com');
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Không thể tải thông tin người dùng');
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const unsubscribe = firestore()
        .collection('services')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const list = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setServices(list);
          setLoading(false);
          setError('');
        }, err => {
          console.error('Error fetching services:', err);
          setError('Không thể tải danh sách dịch vụ');
          setLoading(false);
        });

      return unsubscribe;
    } catch (err) {
      console.error('Error in fetchServices:', err);
      setError('Có lỗi xảy ra khi tải dữ liệu');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
    const unsubscribe = fetchServices();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([fetchUserData(), fetchServices()]);
    setRefreshing(false);
  }, []);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
      style={styles.serviceItem}
    >
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.servicePrice}>{item.price?.toLocaleString('vi-VN')} đ</Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e57373" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name || 'Tên người dùng'}</Text>
        <TouchableOpacity onPress={() => auth().signOut()}>
          <Text style={styles.headerIcon}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../images/logolab3.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Add + Danh sách */}
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Danh sách dịch vụ</Text>
        {isAdmin && (
          <TouchableOpacity onPress={() => navigation.navigate('AddService')}>
            <Text style={styles.addIcon}>➕</Text>
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
            <Text style={styles.retryText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#e57373']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Chưa có dịch vụ nào</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e57373',
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerIcon: { fontSize: 24, color: '#fff' },
  logoContainer: { alignItems: 'center', marginVertical: 12 },
  logo: { width: 140, height: 60 },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  listTitle: { fontSize: 16, fontWeight: 'bold' },
  addIcon: { fontSize: 24, color: '#e57373' },
  listContent: { paddingHorizontal: 16, paddingBottom: 80 },
  serviceItem: {
    backgroundColor: '#fafafa',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
  },
  serviceName: { fontSize: 15, flex: 1 },
  servicePrice: { fontWeight: 'bold', color: '#e57373' },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#e57373',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#e57373',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});
