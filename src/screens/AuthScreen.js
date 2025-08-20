import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppRoutes from '../navigation/AppRoutes';
import colors from '../utils/colors';
import PrimaryButton from '../components/PrimaryButton';
import HandleInput from '../components/HandleInput';
import ShowMessage from '../hooks/ShowMessage';
import validateEmail from '../utils/validateEmail';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store/slices/authSlice';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';

const AuthScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Unified handler for Login & Signup
  const handleAuth = () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // --- Validation ---
    if (isSignUp) {
      if (!firstName.trim())
        return ShowMessage('Please enter your first name!', true);
      if (!lastName.trim())
        return ShowMessage('Please enter your last name!', true);
    }

    if (!trimmedEmail) return ShowMessage('Please enter your email!', true);
    if (!validateEmail(trimmedEmail))
      return ShowMessage('Please enter a valid email address', true);

    if (!trimmedPassword)
      return ShowMessage('Please enter your password!', true);
    if (trimmedPassword.length < 6)
      return ShowMessage('Password must be at least 6 characters!', true);

    // --- Success ---
    handleFirebase(trimmedEmail, trimmedPassword);
  };

  const handleFirebase = async (email, password) => {
    setLoading(true);

    try {
      const auth = getAuth();
      let userCredential;

      if (isSignUp) {
        // 🔑 Firebase Signup
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );

        // Update display name
        await updateProfile(userCredential.user, {
          displayName: `${firstName} ${lastName}`,
        });

        ShowMessage('Account created successfully!');
      } else {
        // 🔑 Firebase Login
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        ShowMessage('Login successful!');
      }

      // Prepare user payload safely
      const user = userCredential.user;
      const payload = {
        displayName:
          user.displayName || user.providerData?.[0]?.displayName || '',
        email: user.email || '',
      };

      // Store in Redux
      dispatch(loginAction(payload));

      // Navigate to main/home
      navigation.reset({
        index: 0,
        routes: [{ name: AppRoutes.MAIN_ROUTE }],
      });
    } catch (err) {
      handleFirebaseError(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Centralized error handler
  const handleFirebaseError = error => {
    const errMsg = String(error);
    console.error('Firebase Error: ', errMsg);
    if (errMsg.includes('auth/email-already-in-use')) {
      ShowMessage('This email is already in use', true);
    } else if (errMsg.includes('auth/wrong-password')) {
      ShowMessage('Email and password do not match', true);
    } else if (errMsg.includes('auth/invalid-email')) {
      ShowMessage('Invalid email format', true);
    } else if (errMsg.includes('auth/invalid-credential')) {
      ShowMessage('Please enter valid credentials', true);
    } else if (errMsg.includes('auth/user-not-found')) {
      ShowMessage('User not found', true);
    } else {
      ShowMessage('Something went wrong. Please try again.', true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {loading && <Loading />}
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>City Pulse</Text>
        <Text style={styles.des}>
          {isSignUp ? t('create') : t('SignInText')}
        </Text>

        {isSignUp && (
          <View style={styles.signup}>
            <HandleInput
              placeholder={t('fisrtName')}
              value={firstName}
              setValue={setFirstName}
              type="default"
              width="48%"
            />
            <HandleInput
              placeholder={t('lastname')}
              value={lastName}
              setValue={setLastName}
              type="default"
              width="48%"
            />
          </View>
        )}

        <HandleInput
          placeholder={t('Email')}
          value={email}
          setValue={setEmail}
          type="email-address"
          autoCapitalize="none"
        />
        <HandleInput
          placeholder={t('Password')}
          value={password}
          setValue={setPassword}
          type="default"
          secureTextEntry
        />

        <PrimaryButton
          onPress={handleAuth}
          title={isSignUp ? t('SignUp') : t('Login')}
        />

        <TouchableOpacity onPress={() => setIsSignUp(prev => !prev)}>
          <Text style={styles.link}>
            {isSignUp ? t('haveAccount') : t('NoAccout')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: colors.primaryLight,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  des: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 30,
  },
  link: {
    color: colors.primaryLight,
    marginTop: 20,
    fontSize: 14,
  },
  signup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default AuthScreen;
