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
import colors from '../utills/colors';
import PrimaryButton from '../components/PrimaryButton';
import HandleInput from '../components/HandleInput';
import ShowMessage from '../components/ShowMessage';
import validateEmail from '../utills/validateEmail';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';

const AuthScreen = () => {
  const navigation = useNavigation();
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
    // createUserWithEmailAndPassword(getAuth(), email, password)
    //   .then(e => console.log('eeeeee', e))
    //   .catch(e => console.log('>>>>', e));
    try {
      setLoading(true);
      if (isSignUp) {
        // 🔑 Firebase Signup
        const userCred = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password,
        );
        await userCred.user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });
        ShowMessage('Account created successfully!');
      } else {
        // 🔑 Firebase Login
        await signInWithEmailAndPassword(getAuth(), email, password);
        ShowMessage('Login successful!');
      }

      // ✅ Navigate after success
      navigation.reset({
        index: 0,
        routes: [{ name: AppRoutes.MAIN_ROUTE }], // change to your Home route
      });
    } catch (error) {
      let msg = 'Something went wrong';
      if (error.code === 'auth/email-already-in-use')
        msg = 'Email already in use!';
      if (error.code === 'auth/invalid-email') msg = 'Invalid email!';
      if (error.code === 'auth/user-not-found') msg = 'User not found!';
      if (error.code === 'auth/wrong-password') msg = 'Incorrect password!';
      ShowMessage(msg, true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>City Pulse</Text>
        <Text style={styles.des}>
          {isSignUp ? 'Create your account' : 'Sign in to your account'}
        </Text>

        {isSignUp && (
          <View style={styles.signup}>
            <HandleInput
              placeholder="First Name"
              value={firstName}
              setValue={setFirstName}
              type="default"
              width="48%"
            />
            <HandleInput
              placeholder="Last Name"
              value={lastName}
              setValue={setLastName}
              type="default"
              width="48%"
            />
          </View>
        )}

        <HandleInput
          placeholder="Email"
          value={email}
          setValue={setEmail}
          type="email-address"
          autoCapitalize="none"
        />
        <HandleInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          type="default"
          secureTextEntry
        />

        <PrimaryButton
          onPress={handleAuth}
          title={isSignUp ? 'Sign Up' : 'Login'}
        />

        <TouchableOpacity onPress={() => setIsSignUp(prev => !prev)}>
          <Text style={styles.link}>
            {isSignUp
              ? 'Already have an account? Sign In'
              : 'Don’t have an account? Sign Up'}
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
