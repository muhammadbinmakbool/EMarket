import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import SearchTile from '../components/products/SearchTile';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './favorite.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';
import axios from 'axios';

const Favorite = ({navigation, route}) => {
  // const {isLoading} = useFetch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const {userId} = route.params;

  useEffect(() => {
    setLoading(true);
    const getCartItems = async () => {
      const endpoint = `http://10.0.2.2:3000/api/cart/find/${userId}`;
      try {
        const response = await axios.get(endpoint);
        if (response.status === 200) {
          const cartData = response.data;
          if (cartData !== null) {
            const cartItems = cartData[0].products.map(product => ({
              ...product.cartItem,
              quantity: product.quantity,
            }));
            const totalQuantity = cartItems.reduce(
              (total, item) => total + item.quantity,
              0,
            );
            setLoading(false);
            setItems(cartItems);
            console.log(totalQuantity);
          } else {
            return (
              <Text style={{textAlign: 'center', alignItems: 'center'}}>
                No Item
              </Text>
            );
          }
        } else {
          Alert.alert('Error Fetching Cart Items. Please Try Again');
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error, '------------');
        return (
          <Text style={{textAlign: 'center', alignItems: 'center'}}>
            No Item
          </Text>
        );
      }
    };
    getCartItems();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Cart Items</Text>
        </View>
        {items.length === 0 ? (
          <View style={styles.emptyCartTextContainer}>
            <Text style={styles.emptyCartText}>No item</Text>
          </View>
        ) : (
          <FlatList
            data={items}
            keyExtractor={item => item._id}
            style={{marginHorizontal: 12}}
            renderItem={({item}) => {
              return <SearchTile item={item} userId={userId} />;
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
