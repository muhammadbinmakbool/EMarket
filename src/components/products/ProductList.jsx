import {Text, View, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import useFetch from '../../hook/useFetch';
import {COLORS, SIZES} from '../../constants';
import styles from './productList.style';
import ProductCardView from './ProductCardView';

const ProductList = () => {
  const {data, isLoading, error, refetch} = useFetch();
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.container}
        renderItem={({item}) => {
          return <ProductCardView item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

export default ProductList;
