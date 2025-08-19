import { StyleSheet } from 'react-native';
import colors from '../../utills/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.inputColor,
    borderRadius: 2,
    margin: 10,
    padding: 10,
  },
  location: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  mapsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    height: 50,
    borderRadius: 8,
    marginVertical: 10,
  },
  btnText: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.textPrimary,
    paddingLeft: 5,
  },
  about: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  des: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.textSecondary,
    paddingVertical: 5,
    textOverflow: 'ellipsis',
  },
  more: {
    fontSize: 12,
    fontWeight: 600,
    color: colors.primary,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  entry: {
    fontSize: 14,
    fontWeight: 600,
    color: colors.textPrimary,
  },
  price: {
    fontSize: 18,
    fontWeight: 700,
    color: colors.textPrimary,
  },
  bookContainer: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
});
export default styles;
