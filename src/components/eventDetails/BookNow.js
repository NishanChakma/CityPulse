import { Text, View } from 'react-native';
import React from 'react';
import styles from './styles';
import PrimaryButton from '../PrimaryButton';
import ShowMessage from '../ShowMessage';
import bookNow from '../../assests/book.png';

const BookNow = () => {
  return (
    <View style={styles.bookContainer}>
      <View style={styles.flex}>
        <Text style={styles.entry}>Standard Entry</Text>
        <Text style={styles.price}>From $29</Text>
      </View>
      <PrimaryButton
        onPress={() => ShowMessage('Future Scope')}
        title="Book Now"
        logo={bookNow}
      />
      <Text style={[styles.des, { textAlign: 'center', paddingTop: 10 }]}>
        Secure Payment, Instant confirmation
      </Text>
    </View>
  );
};

export default BookNow;
