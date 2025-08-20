import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import rightArrow from '../assets/rightArrow.png';
import colors from '../utils/colors';

const ProfileCard = ({ logo, title, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, style]}>
        <View style={styles.innerCard}>
          <Image source={logo} style={styles.glob} />
          <Text style={styles.lang}>{title}</Text>
        </View>
        <Image source={rightArrow} style={styles.rightArrow} />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: colors.inputColor,
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  innerCard: { flexDirection: 'row', alignItems: 'center' },
  glob: {
    height: 20,
    width: 20,
  },
  rightArrow: {
    height: 24,
    width: 12,
  },
  lang: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.textPrimary,
    paddingLeft: 20,
  },
});
