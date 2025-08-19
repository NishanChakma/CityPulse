import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import EventCard from './EventCard';
import colors from '../utills/colors';

// ✅ Event List
const EventList = () => {
  const events = useSelector(state => state.event.events);

  if (!events || events.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Events</Text>
      <Text style={styles.des}>Discover what’s happening around you</Text>

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EventCard item={item} />}
        scrollEnabled={false} // keep parent ScrollView scrolling
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default EventList;

// ✅ Styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 8,
  },
  des: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
    textAlign: 'center',
    paddingBottom: 20,
    paddingHorizontal: 40,
  },
});
