import {Text, TouchableOpacity, View, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './searchTile.style';
import {useNavigation} from '@react-navigation/native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS} from '../../constants';
import axios from 'axios';

const SearchTile = ({item, userId}) => {
  const navigation = useNavigation();
  const [count, setCount] = useState(1);

  const addToCart = async () => {
    const data = {
      cartItem: item._id,
      userId: userId,
      quantity: 1,
    };
    const endpoint = 'http://10.0.2.2:3000/api/cart/';
    try {
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        console.log('Product Added');
        setCount(count + 1);
      } else {
        Alert.alert('Error adding to Cart. Please try again');
      }
    } catch (error) {
      Alert.alert('Error adding to Cart. Please try again');
      console.log(error);
    }
  };

  const removeItem = async () => {
    const data = {
      cartItem: item._id,
      userId: userId,
    };
    const endpoint = 'http://10.0.2.2:3000/api/cart/quantity';
    try {
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        console.log('Product Removed x1');
        setCount(count - 1);
      } else {
        Alert.alert('Error Removing from Cart. Please try again');
      }
    } catch (error) {
      Alert.alert('Error Removing from Cart. Please try again');
      console.log(error);
    }
  };
  useEffect(() => {
    setCount(item.quantity);
  }, []);
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          navigation.navigate('ProductDetails', {item});
        }}>
        <View style={styles.image}>
          <Image source={{uri: item.imageUrl}} style={styles.productImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.supplier}>{item.supplier}</Text>
          <Text style={styles.supplier}>${item.price}</Text>
        </View>
        {item.quantity ? (
          <View style={styles.count}>
            <TouchableOpacity
              onPress={() => {
                addToCart();
              }}>
              <SimpleLineIcons name="plus" size={20} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.countText}>{count}</Text>
            <TouchableOpacity
              onPress={() => {
                removeItem();
              }}>
              <SimpleLineIcons name="minus" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SearchTile;
