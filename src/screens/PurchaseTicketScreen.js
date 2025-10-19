import { useMemo, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import PhoneInput from 'react-native-phone-input';
import PrimaryButton from '../components/PrimaryButton';
import { showMessage } from '../hooks/ShowMessage';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';

const PurchaseTicketScreen = ({ route }) => {
  const navigation = useNavigation();
  const phoneRef = useRef(null);
  const { price } = route.params;
  const userInfo = useSelector(state => state?.auth?.userInfo);
  const parts = userInfo.displayName.trim().split(' ');
  const firstName = parts[0];
  const lastName = parts.slice(1).join(' '); // handles middle names too

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ticketType: 'regular',
      firstName,
      lastName,
      email: userInfo?.email ?? '',
    },
  });

  const ticketType = watch('ticketType');

  const updatedPrice = useMemo(() => {
    return ticketType === 'vip' ? price + 10 : price;
  }, [ticketType, price]);

  const onSubmit = data => {
    console.log('Form Data:', data);
    showMessage('Ticket purchased successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <Text style={styles.title}>Purchase Event Ticket</Text>

          {/* First Name */}
          <Controller
            control={control}
            name="firstName"
            rules={{ required: 'First name is required' }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#888"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.firstName && (
                  <Text style={styles.error}>{errors.firstName.message}</Text>
                )}
              </>
            )}
          />

          {/* Last Name */}
          <Controller
            control={control}
            name="lastName"
            rules={{ required: 'Last name is required' }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#888"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.lastName && (
                  <Text style={styles.error}>{errors.lastName.message}</Text>
                )}
              </>
            )}
          />

          {/* Email */}
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Email is invalid',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={value}
                  onChangeText={onChange}
                />
                {errors.email && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </>
            )}
          />

          {/* Phone Number */}
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: 'Phone number is required',
              validate: () =>
                phoneRef.current?.isValidNumber() || 'Invalid phone number',
            }}
            render={({ field: { value } }) => (
              <>
                <PhoneInput
                  ref={phoneRef}
                  initialCountry="bd"
                  value={value}
                  onChangePhoneNumber={num => setValue('phoneNumber', num)}
                  style={styles.phoneInput}
                  textStyle={{ color: '#fff' }}
                />
                {errors.phoneNumber && (
                  <Text style={styles.error}>{errors.phoneNumber.message}</Text>
                )}
              </>
            )}
          />

          {/* Ticket Type Radio Buttons */}
          <Text style={[styles.label, { paddingTop: 10 }]}>
            Select Ticket Type:
          </Text>
          <View style={styles.radioGroup}>
            {['regular', 'vip'].map(type => (
              <TouchableOpacity
                key={type}
                style={styles.radioOption}
                onPress={() => setValue('ticketType', type)}
              >
                <View style={styles.radioOuter}>
                  {watch('ticketType') === type && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioText}>
                  {type === 'regular' ? 'Regular Ticket' : 'VIP Ticket'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.total}>Ticket Price: {price}</Text>
          <Text style={styles.total}>
            Total Price: {updatedPrice} (Ticket Price + Additional Charge:{' '}
            {watch('ticketType') === 'vip' ? '10' : '0'})
          </Text>

          {/* Submit Button */}
          <PrimaryButton onPress={handleSubmit(onSubmit)} title={'Purchase'} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PurchaseTicketScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
    marginTop: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    color: '#fff',
  },
  phoneInput: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    width: '100%',
  },
  error: { color: 'red', fontSize: 12, marginBottom: 10 },
  label: { fontSize: 16, marginBottom: 8, fontWeight: '500', color: '#fff' },
  radioGroup: {
    flexDirection: 'column',
    marginBottom: 20,
    marginTop: 5,
    gap: 10,
  },
  radioOption: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  radioText: { color: '#fff', fontSize: 14 },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  total: {
    color: '#fff',
    fontSize: 12,
    paddingBottom: 10,
    fontWeight: '600',
  },
});
