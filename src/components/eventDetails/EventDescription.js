import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const EventDescription = () => {
  const { t } = useTranslation();
  const event = useSelector(state => state.event.currentEvent);
  const [viewAll, setviewAll] = useState(true);

  if (!event?.info && !event?.pleaseNote) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.about}>{t('About')}</Text>
      <Text
        style={styles.des}
        numberOfLines={viewAll ? 4 : undefined}
        ellipsizeMode="tail"
      >
        {event?.info}
      </Text>
      <Text
        style={styles.des}
        numberOfLines={viewAll ? 4 : undefined}
        ellipsizeMode="tail"
      >
        {event?.pleaseNote}
      </Text>
      <TouchableOpacity onPress={() => setviewAll(e => !e)}>
        <Text style={styles.more}>
          {viewAll ? t('ReadMore') : t('Collapse')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDescription;
