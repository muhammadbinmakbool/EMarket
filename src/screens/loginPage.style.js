import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {Fonts} from '../styles';

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: 'contain',
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: 'center',
    marginBottom: SIZES.xxLarge,
  },
  wrapper: {
    marginBottom: 20,
    // marginHorizontal: 20,
  },
  label: {
    fontFamily: Fonts.REGULAR,
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: 'right',
  },
  inputWrapper: borderColor => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMsg: {
    color: COLORS.red,
    fontFamily: Fonts.REGULAR,
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registration: {
    marginTop: 20,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default styles;
