import { Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import styles from './styles';

const EventDescription = () => {
  const [viewAll, setviewAll] = useState(true);
  return (
    <View style={styles.container}>
      <Text style={styles.about}>About This Event</Text>
      <Text
        style={styles.des}
        numberOfLines={viewAll ? 4 : undefined}
        ellipsizeMode="tail"
      >
        Prepare for a thunderous night of headbanging and electric riffs at
        Echoes of Metal — the ultimate celebration of heavy metal and hard rock.
        Featuring iconic bands and explosive stage effects, this show promises
        an unforgettable journey into the heart of metal. Prepare for a
        thunderous night of headbanging and electric riffs at Echoes of Metal —
        the ultimate celebration of heavy metal and hard rock. Featuring iconic
        bands and explosive stage effects, this show promises an unforgettable
        journey into the heart of metal.
      </Text>
      <TouchableOpacity onPress={() => setviewAll(e => !e)}>
        <Text style={styles.more}>{viewAll ? 'Read More' : 'Collapse'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventDescription;
