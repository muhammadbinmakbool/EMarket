import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {Fonts} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
    marginBottom: SIZES.xxLarge - 8,
  },
  heading: {
    fontFamily: Fonts.SEMIBOLD,
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },
  separator: {
    height: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  emptyCartTextContainer: {top: SIZES.height / 2 - 70},
  emptyCartText: {
    textAlign: 'center',
    fontFamily: Fonts.SEMIBOLD,
    fontSize: SIZES.large,
    color: COLORS.gray,
  },
});

export default styles;
