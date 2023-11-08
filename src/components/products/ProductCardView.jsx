import {Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import styles from './productCardVew.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const ProductCardView = ({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ProductDetails', {item});
      }}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.image}
          />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.supplier}>Product</Text>
          <Text style={styles.price}>100$</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCardView;
