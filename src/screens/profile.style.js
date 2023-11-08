import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../constants';
import {Fonts} from '../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  cover: {
    height: 290,
    width: '100%',
    resizeMode: 'cover',
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
  },
  profile: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: 'cover',
    marginTop: -90,
    borderWidth: 2,
  },
  name: {
    fontFamily: Fonts.BOLD,
    color: COLORS.primary,
    marginVertical: 5,
  },
  loginBtn: {
    backgroundColor: COLORS.secondary,
    padding: 2,
    borderWidth: 0.6,
    borderColor: COLORS.primary,
    borderRadius: SIZES.xLarge,
  },
  menuText: {
    fontFamily: Fonts.REGULAR,
    color: COLORS.gray,
    marginHorizontal: 20,
    fontSize: 14,
    lineHeight: 26,
    fontWeight: '600',
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  menuItem: borderBottomWidth => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
});

export default styles;
