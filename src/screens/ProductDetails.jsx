import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import styles from './productDetail.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS, SIZES} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProductDetails = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  const {userId} = route.params;

  const [count, setCount] = useState(1);
  const [favoriteIcon, setFavoriteIcon] = useState();
  const [favorites, setFavorites] = useState([]);
  const [loader, setLoader] = useState(false);

  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCart = async () => {
    const data = {
      cartItem: item._id,
      userId: userId,
      quantity: count,
    };
    setLoader(true);
    const endpoint = 'http://10.0.2.2:3000/api/cart/';
    try {
      const response = await axios.post(endpoint, data);
      if (response.status === 200) {
        setLoader(false);
        console.log('Product Added');
      } else {
        Alert.alert('Error adding to Cart. Please try again');
        setLoader(false);
      }
    } catch (error) {
      Alert.alert('Error adding to Cart. Please try again');
      console.log(error);
      setLoader(false);
    }
  };

  const selectFavorite = async () => {
    if (userId === null) {
      return Alert.alert('Kindly Login to Add a Favorite');
    } else {
      try {
        const itemIndex = favorites.findIndex(
          favItem => favItem._id === item._id,
        );
        if (itemIndex !== -1) {
          favorites.splice(itemIndex, 1);
          await AsyncStorage.setItem(
            `user${userId}fav`,
            JSON.stringify(favorites),
          );
          setFavoriteIcon(false);
        } else {
          favorites.push(item);
          await AsyncStorage.setItem(
            `user${userId}fav`,
            JSON.stringify(favorites),
          );
          setFavoriteIcon(true);
        }
      } catch (error) {
        console.log('ERROR Updating the Favorite', error);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (userId === null) {
        setFavoriteIcon(false);
      } else {
        try {
          const getFavorites = await AsyncStorage.getItem(`user${userId}fav`);
          setFavorites(JSON.parse(getFavorites) || []);
          console.log(favorites, '========');
          if (favorites) {
            const checkFavorite = favorites.some(
              favItem => favItem._id === item._id,
            );
            if (checkFavorite) {
              setFavoriteIcon(true);
            } else {
              setFavoriteIcon(false);
            }
          }
        } catch (error) {
          console.log('ERROR Updating the Favorite', error);
        }
      }
    };
    fetchData();
  }, [favoriteIcon]);
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="chevron-back-circle" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => selectFavorite()}>
          <Ionicons
            name={!favoriteIcon ? 'heart-outline' : 'heart'}
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.price}>$ {item.price}</Text>
          </View>
        </View>
        <View style={styles.ratingRow}>
          <View style={styles.rating}>
            {[1, 2, 3, 4, 5].map(index => (
              <Ionicons key={index} name="star" size={24} color="gold" />
            ))}
            <Text style={styles.ratingText}>(4.9)</Text>
          </View>
          <View style={styles.rating}>
            <TouchableOpacity
              onPress={() => {
                increment();
              }}>
              <SimpleLineIcons name="plus" size={20} color={COLORS.black} />
            </TouchableOpacity>
            <Text style={styles.ratingText}>{count}</Text>
            <TouchableOpacity
              onPress={() => {
                decrement();
              }}>
              <SimpleLineIcons name="minus" size={20} color={COLORS.black} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
        <View style={{marginBottom: SIZES.small}}>
          <View style={styles.location}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                name="location-outline"
                size={20}
                color={COLORS.black}
              />
              <Text style={{paddingHorizontal: 5, color: COLORS.gray}}>
                {item.product_location}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons
                name="truck-delivery-outline"
                size={20}
                color={COLORS.black}
              />
              <Text style={{paddingHorizontal: 5, color: COLORS.gray}}>
                Free Delivery
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => addToCart()}
            style={styles.addToCart}>
            {!loader ? (
              <Fontisto
                name="shopping-bag"
                size={22}
                color={COLORS.lightWhite}
              />
            ) : (
              <ActivityIndicator color={COLORS.lightWhite} size={SIZES.small} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
