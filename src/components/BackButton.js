import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import colors from '../utils/colors';
import back from '../assets/back.png';

const BackButton = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <View style={styles.backContent}>
        <Image source={back} style={styles.backIcon} />
        <Text style={styles.backText}>{t('Back')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    height: 40,
    backgroundColor: '#000',
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  backText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
    marginLeft: 5,
  },
});
