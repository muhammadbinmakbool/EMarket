import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {Fonts} from '../../styles';

const styles = StyleSheet.create({
  container: {
    width: 182,
    height: 240,
    marginEnd: SIZES.medium,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },
  imageContainer: {
    flex: 1,
    width: 170,
    marginLeft: SIZES.small / 2,
    marginTop: SIZES.small / 2,
    borderRadius: SIZES.small,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  details: {
    padding: SIZES.small,
  },
  title: {
    fontFamily: Fonts.BOLD,
    fontSize: SIZES.large,
    marginBottom: 2,
    color: COLORS.black,
  },
  supplier: {
    fontFamily: Fonts.REGULAR,
    fontSize: SIZES.small,
    color: COLORS.gray,
  },
  price: {
    fontFamily: Fonts.BOLD,
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  addBtn: {
    position: 'absolute',
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});

export default styles;
