import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from '../../constants';
import {Fonts} from '../../styles';

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.small,
    // marginBottom: -SIZES.xSmall,
    marginHorizontal: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontFamily: Fonts.SEMIBOLD,
    fontSize: SIZES.xLarge - 2,
    color: COLORS.black,
  },
});

export default styles;
