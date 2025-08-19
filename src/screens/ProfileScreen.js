import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import bg from '../assests/bg.png';
import men from '../assests/men.png';
import colors from '../utills/colors';
import fingerprint from '../assests/fingerprint.png';
import glob from '../assests/glob.png';
import logout from '../assests/logout.png';
import ProfileCard from '../components/ProfileCard';
import { getAuth, signOut } from '@react-native-firebase/auth';
import ShowMessage from '../components/ShowMessage';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../store/slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import AppRoutes from '../navigation/AppRoutes';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.img} />
      <Image source={men} style={styles.men} />
      <View style={{ padding: 10 }}>
        <Text style={styles.preference}>Preference</Text>
        <ProfileCard
          logo={glob}
          title="Language"
          onPress={() => setlanguageModal(true)}
        />
        <ProfileCard
          logo={fingerprint}
          title="Biometric Login"
          onPress={() => setlanguageModal(true)}
        />
        <ProfileCard
          logo={logout}
          title="Logout"
          onPress={() => handleLogout(true)}
          style={{ marginTop: 50 }}
        />
      </View>
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
});
