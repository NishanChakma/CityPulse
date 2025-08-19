import { Text, View } from 'react-native';
import React from 'react';
import styles from './styles';
import PrimaryButton from '../PrimaryButton';
import ShowMessage from '../ShowMessage';
import bookNow from '../../assests/book.png';

const BookNow = () => {
  const min = 20;
  const max = 60;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return (
    <View style={styles.bookContainer}>
      <View style={styles.flex}>
        <Text style={styles.entry}>Standard Entry</Text>
        <Text style={styles.price}>From ${randomNumber}</Text>
      </View>
      <PrimaryButton
        onPress={() => ShowMessage('Future Scope')}
        title="Book Now"
        logo={bookNow}
      />
      <Text style={[styles.des, { textAlign: 'center', paddingTop: 20 }]}>
        Secure Payment, Instant confirmation
      </Text>
    </View>
  );
};

export default BookNow;
