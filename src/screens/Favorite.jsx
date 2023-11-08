import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchTile from '../components/products/SearchTile';
import {SafeAreaView} from 'react-native-safe-area-context';
import useFetch from '../hook/useFetch';
import styles from './favorite.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';

const Favorite = ({navigation, route}) => {
  const {isLoading} = useFetch();
  const [items, setItems] = useState([]);

  const {userId} = route.params;
  const getFavorites = async () => {
    try {
      const getItems = await AsyncStorage.getItem(`user${userId}fav`);
      const favoriteItems = JSON.parse(getItems);
      setItems(favoriteItems);
    } catch (error) {
      console.log('Error Fetching Favorite Items', error);
    }
  };
  useEffect(() => {
    getFavorites();
  }, []);

  if (isLoading) {
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
          <Text style={styles.heading}>Favorites</Text>
        </View>
        <FlatList
          data={items}
          keyExtractor={item => item._id}
          style={{marginHorizontal: 12}}
          renderItem={({item}) => <SearchTile item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorite;
