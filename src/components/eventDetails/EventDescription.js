import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import { useSelector } from 'react-redux';

const EventDescription = () => {
  const event = useSelector(state => state.event.currentEvent);
  const [viewAll, setviewAll] = useState(true);

  if (!event?.info && !event?.pleaseNote) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.about}>About This Event</Text>
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
        <Text style={styles.more}>{viewAll ? 'Read More' : 'Collapse'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDescription;
