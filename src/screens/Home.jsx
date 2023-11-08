import {ScrollView, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './home.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {Welcome, ProductRow, Carousal, Headings} from '../components';
import {COLORS} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hook/useFetch';

const Home = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const {count} = useFetch();

  useEffect(() => {
    checkExistingUser();
  }, []);

  const checkExistingUser = async () => {
    const id = await AsyncStorage.getItem('id');
    const useId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(useId);
      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log('Error retrieving Data', error);
    }
  };
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} color={COLORS.black} />
          <Text style={styles.location}>
            {userData ? userData.location : 'Rahimyar Khan'}
          </Text>
          <View style={{alignItems: 'flex-end'}}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>{count}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                userLogin
                  ? navigation.navigate('Cart')
                  : Alert.alert('Login to view the Cart');
              }}>
              <Fontisto name="shopping-bag" size={24} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <Welcome />
        <Carousal />
        <Headings />
        <ProductRow />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
