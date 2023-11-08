import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {Fonts} from '../../styles';
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  welcomeText: {
    fontFamily: Fonts.BOLD,
    fontSize: SIZES.xLarge,
    marginHorizontal: SIZES.small,
    // color: color
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.small,
    height: 50,
    marginHorizontal: SIZES.small,
  },
  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: Fonts.REGULAR,
    width: '100%',
    height: '100%',
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    backgroundColor: COLORS.primary,
    height: '100%',
    borderRadius: SIZES.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
