import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES} from '../constants';

const BackBtn = ({onPress}) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.backBtn}>
        <Ionicons name="chevron-back-circle" size={30} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default BackBtn;

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'center',
    position: 'absolute',
    zIndex: 999,
    top: SIZES.large - 1,
  },
});
