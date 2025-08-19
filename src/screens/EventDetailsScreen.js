import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import back from '../assests/back.png';
import calendarRound from '../assests/calendarRound.png';
import timeRound from '../assests/timeRound.png';
import locationRound from '../assests/locationRound.png';
import colors from '../utills/colors';

import EventDescription from '../components/eventDetails/EventDescription';
import MapsView from '../components/eventDetails/MapsView';
import BookNow from '../components/eventDetails/BookNow';
import ImageSlider from '../components/eventDetails/ImageSlider';

dayjs.extend(utc);
dayjs.extend(timezone);

// Reusable EventCard component
const EventCard = ({ logo, title, description }) => (
  <View style={styles.cardContainer}>
    <Image source={logo} style={styles.cardLogo} />
    <View style={styles.cardTextContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </View>
);

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const event = useSelector(state => state.event.currentEvent);

  // Helper functions
  const formatDate = date => dayjs(date).format('dddd, MMMM D');
  const formatYear = date => dayjs(date).format('YYYY');
  const formatTime = date => dayjs.utc(date).format('h:mm A');

  const venue = event?._embedded?.venues?.[0];
  const venueAddress = venue
    ? `${venue.address?.line1 || ''}, ${venue.city?.name || ''}`
    : 'N/A';

  const genresAndSegments = [
    ...(event?.classifications?.map(c => c.genre?.name) || []),
    ...(event?.classifications?.map(c => c.segment?.name) || []),
  ].join(', ');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <View style={styles.backContent}>
          <Image source={back} style={styles.backIcon} />
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ImageSlider />

        <View style={styles.eventInfo}>
          <Text style={styles.title}>{event?.name || 'Event Name'}</Text>
          <Text style={styles.subTitle}>
            {genresAndSegments || 'Event Type'}
          </Text>
        </View>

        <EventCard
          logo={calendarRound}
          title={formatDate(event?.dates?.access?.startDateTime)}
          description={formatYear(event?.dates?.access?.startDateTime)}
        />
        <EventCard
          logo={timeRound}
          title={formatTime(event?.dates?.access?.startDateTime)}
          description={`Doors open at ${formatTime(
            event?.dates?.start?.dateTime,
          )}`}
        />
        <EventCard
          logo={locationRound}
          title={venue?.name || 'Venue'}
          description={venueAddress}
        />

        <EventDescription />
        <MapsView />
        <BookNow />
      </ScrollView>
    </View>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 999,
  },
  backContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  backText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '700',
    marginLeft: 5,
  },
  eventInfo: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: '700',
    paddingBottom: 5,
  },
  subTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
    paddingBottom: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cardLogo: {
    width: 42,
    height: 42,
  },
  cardTextContainer: {
    paddingLeft: 10,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '400',
    paddingTop: 2,
  },
});
