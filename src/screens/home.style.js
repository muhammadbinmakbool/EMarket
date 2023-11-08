import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {Fonts} from '../styles';

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: Fonts.BOLD,
    fontSize: 40,
    // fontFamily: 'bold',
  },
  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  location: {
    fontFamily: Fonts.SEMIBOLD,
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  cartCount: {
    position: 'absolute',
    bottom: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: 'green',
    justifyContent: 'center',
    zIndex: 999,
  },
  cartNumber: {
    fontFamily: Fonts.REGULAR,
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});

export default styles;
