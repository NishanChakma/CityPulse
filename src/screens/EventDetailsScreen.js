import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import back from '../assests/back.png';
import colors from '../utills/colors';
import { useNavigation } from '@react-navigation/native';
import calendarRound from '../assests/calendarRound.png';
import timeRound from '../assests/timeRound.png';
import locationRound from '../assests/locationRound.png';
import EventDescription from '../components/eventDetails/EventDescription';
import MapsView from '../components/eventDetails/MapsView';
import BookNow from '../components/eventDetails/BookNow';
import { useSelector } from 'react-redux';
import ImageSlider from '../components/eventDetails/ImageSlider';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const EventCard = ({ title, des, logo }) => {
  return (
    <View style={styles.flex}>
      <Image source={logo} style={{ height: 42, width: 42 }} />
      <View style={{ paddingLeft: 10 }}>
        <Text style={styles.time}>{title}</Text>
        <Text style={styles.year}>{des}</Text>
      </View>
    </View>
  );
};

const EventDetailsScreen = () => {
  const navigation = useNavigation();
  const event = useSelector(state => state.event.currentEvent);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={back} style={{ height: 25, width: 25 }} />
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableOpacity>

      <ScrollView>
        <ImageSlider />

        <View style={{ paddingHorizontal: 10 }}>
          <Text style={styles.title}>{event?.name}</Text>
          <Text style={styles.place}>
            {/* Join genre names and segment names with a comma */}
            {[
              ...(event?.classifications?.map(e => e.genre.name) || []),
              ...(event?.classifications?.map(e => e.segment.name) || []),
            ].join(', ')}
          </Text>
        </View>

        <EventCard
          logo={calendarRound}
          title={dayjs(event?.dates?.access?.startDateTime).format(
            'dddd, MMMM D',
          )}
          des={dayjs(event?.dates?.access?.startDateTime).format('YYYY')}
        />
        <EventCard
          logo={timeRound}
          title={dayjs
            .utc(event?.dates?.access?.startDateTime)
            .format('h:mm A')}
          des={
            'Doors open at ' +
            dayjs.utc(event?.dates?.start?.dateTime).format('h:mm A')
          }
        />
        <EventCard
          logo={locationRound}
          title={event?._embedded?.venues?.[0]?.name}
          des={
            event?._embedded?.venues?.[0]?.address?.line1 +
            ', ' +
            event?._embedded?.venues?.[0]?.city?.name
          }
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
    position: 'relative',
  },
  bg: {
    height: 300,
    width: '100%',
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 999,
  },
  backText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 700,
  },
  title: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: 700,
    paddingVertical: 10,
  },
  place: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: 400,
    paddingBottom: 20,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 600,
  },
  year: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: 400,
    paddingTop: 2,
  },
});
