import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../utills/colors';

const PrimaryButton = ({ onPress, title, logo = null }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {logo && (
        <Image
          source={logo}
          style={{ height: 24, width: 24, marginRight: 5 }}
        />
      )}
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: colors.buttonColor,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
