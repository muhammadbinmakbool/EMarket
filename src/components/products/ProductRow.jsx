import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants';
import ProductCardView from './ProductCardView';
import styles from './productRow.style';
import useFetch from '../../hook/useFetch';

const ProductRow = () => {
  const {data, isLoading, error} = useFetch();
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something is Went Wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item._id}
          horizontal={true}
          contentContainerStyle={{columnGap: SIZES.medium}}
          renderItem={({item}) => {
            return <ProductCardView item={item} />;
          }}
        />
      )}
    </View>
  );
};

export default ProductRow;
