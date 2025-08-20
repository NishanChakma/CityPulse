import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import bg from '../assets/bg.png';
import men from '../assets/men.png';
import colors from '../utils/colors';
import fingerprint from '../assets/fingerprint.png';
import glob from '../assets/glob.png';
import logout from '../assets/logout.png';
import ProfileCard from '../components/ProfileCard';
import { getAuth, signOut } from '@react-native-firebase/auth';
import ShowMessage from '../hooks/ShowMessage';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, setBiometric } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import AppRoutes from '../navigation/AppRoutes';
import LanguageModal from '../components/modal/LanguageModal';
import { useTranslation } from 'react-i18next';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(state => state?.auth?.userInfo);
  const biometric = useSelector(state => state?.auth?.biometric);
  const [languageModal, setlanguageModal] = useState(false);

  const handleLogout = async () => {
    await signOut(getAuth())
      .then(() => {
        dispatch(logoutAction());
        navigation.reset({
          index: 0,
          routes: [{ name: AppRoutes.AUTHSCREEN }],
        });
      })
      .catch(
        () => ShowMessage('Error! Please check your internet connection', true), //due to no backend firebase will unable to logout without internet);
      );
  };

  const handleRadio = e => {
    ShowMessage('Future Scope');
    if (!e) {
      dispatch(setBiometric(false));
      return;
    }
    const rnBiometric = new ReactNativeBiometrics();
    rnBiometric.isSensorAvailable().then(({ available, biometryType }) => {
      if (available && biometryType !== BiometryTypes.TouchID) {
        ShowMessage('Touch ID not available on this device!');
      } else {
        rnBiometric
          .createKeys('Confirm fingerprint')
          .then(async () => {
            dispatch(setBiometric(true));
            // ShowMessage('Fingerprint saved successfully');
          })
          .catch(e => console.error('error: ', e));
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.img} />
      <Image source={men} style={styles.men} />
      {userInfo?.displayName && (
        <Text style={styles.name}>{userInfo.displayName}</Text>
      )}
      {userInfo?.email && <Text style={styles.email}>{userInfo.email}</Text>}

      <View style={{ padding: 10 }}>
        <Text style={styles.preference}>{t('Preference')}</Text>
        <ProfileCard
          logo={glob}
          title={t('language')}
          onPress={() => setlanguageModal(true)}
        />
        <ProfileCard
          logo={fingerprint}
          title={t('Biometric')}
          onPress={handleRadio}
          style={{}}
          isEnabled={biometric}
          showRadio={true}
        />
        <ProfileCard
          logo={logout}
          title={t('Logout')}
          onPress={handleLogout}
          style={{ marginTop: 50 }}
        />
      </View>

      <LanguageModal visible={languageModal} setVisible={setlanguageModal} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: 132,
    width: '100%',
  },
  men: {
    height: 90,
    width: 90,
    borderRadius: 42,
    marginTop: -45,
    alignSelf: 'center',
  },
  preference: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.textPrimary,
    textAlign: 'left',
    paddingBottom: 10,
    paddingTop: 20,
  },
  name: {
    color: colors.primary,
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 700,
  },
  email: {
    color: colors.textPrimary,
    fontSize: 14,
    textAlign: 'center',
    paddingTop: 10,
  },
});
