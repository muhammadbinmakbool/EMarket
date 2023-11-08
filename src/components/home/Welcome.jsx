import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import React from 'react';
import styles from './welcome.style';
import {COLORS, SIZES} from '../../constants';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text
          style={[
            styles.welcomeText,
            {color: COLORS.black, marginTop: SIZES.xSmall},
          ]}>
          Find The Most
        </Text>
        <Text
          style={[
            styles.welcomeText,
            {color: COLORS.primary, marginTop: SIZES.xSmall},
          ]}>
          Luxurious Furniture
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity style={{justifyContent: 'center'}}>
          <FeatherIcon name="search" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onPressIn={() => {
              navigation.navigate('Search');
            }}
            placeholder="What are You Looking for"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
