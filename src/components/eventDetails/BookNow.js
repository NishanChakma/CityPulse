import { Text, View } from 'react-native';
import React from 'react';
import styles from './styles';
import PrimaryButton from '../PrimaryButton';
import ShowMessage from '../../hooks/ShowMessage';
import bookNow from '../../assets/book.png';
import { useTranslation } from 'react-i18next';

const BookNow = () => {
  const { t } = useTranslation();
  const min = 20;
  const max = 60;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return (
    <View style={styles.bookContainer}>
      <View style={styles.flex}>
        <Text style={styles.entry}>{t('standard')}</Text>
        <Text style={styles.price}>
          {t('from')} ${randomNumber}
        </Text>
      </View>
      <PrimaryButton
        onPress={() => ShowMessage('Future Scope')}
        title={t('BookNow')}
        logo={bookNow}
      />
      <Text style={[styles.des, { textAlign: 'center', paddingTop: 20 }]}>
        {t('secure')}
      </Text>
    </View>
  );
};

export default BookNow;
