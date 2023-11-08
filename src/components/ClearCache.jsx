import {Alert} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFetch from '../hook/useFetch';

const ClearCache = () => {
  const {userId} = useFetch();
  const clearData = async () => {
    const endpoint = `http://10.0.2.2:3000/api/cart/delete/${userId}`;
    try {
      // Remove cart data
      const response = await axios.delete(endpoint);
      if (response.status === 200) {
        console.log('Cart Deleted');
      } else {
        console.log('Error Deleting Cart');
      }
    } catch (cartError) {
      console.log('Error Clearing Cart Data', cartError);
    }

    try {
      const res = await AsyncStorage.removeItem(`user${userId}fav`);
      if (!res) {
        console.log('Favorites Removed');
      } else {
        console.log('Error Removing Favorites');
      }
    } catch (favoritesError) {
      console.log('Error Clearing Favorites Data', favoritesError);
    }
  };

  return Alert.alert(
    'Clear Cache',
    'Are you sure You want to Delete all saved Data on your device including Favorites & Cart Items',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Clear Cache'),
      },
      {
        text: 'Continue',
        onPress: () => clearData(),
      },
    ],
  );
};

export default ClearCache;
