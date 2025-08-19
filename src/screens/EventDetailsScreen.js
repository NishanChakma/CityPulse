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
import events from '../assests/events.png';
import colors from '../utills/colors';
import { useNavigation } from '@react-navigation/native';
import calendarRound from '../assests/calendarRound.png';
import timeRound from '../assests/timeRound.png';
import locationRound from '../assests/locationRound.png';
import EventDescription from '../components/eventDetails/EventDescription';
import MapsView from '../components/eventDetails/MapsView';
import BookNow from '../components/eventDetails/BookNow';

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
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={back} style={{ height: 25, width: 25 }} />
          <Text style={styles.backText}>Back</Text>
        </View>
      </TouchableOpacity>

      <ScrollView>
        <Image source={events} style={styles.bg} />

        <View style={{ paddingLeft: 10, paddingRight: 10 }}>
          <Text style={styles.title}>Echoes of Metal</Text>
          <Text style={styles.place}>Heavy Metal, Hard Rock, Alternative</Text>
        </View>

        <EventCard
          logo={calendarRound}
          title={'Monday, August 26'}
          des={'2024'}
        />
        <EventCard logo={timeRound} title={'Monday, August 26'} des={'2024'} />
        <EventCard
          logo={locationRound}
          title={'Monday, August 26'}
          des={'2024'}
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
    top: 10,
    left: 10,
    zIndex: 999,
  },
  backText: {
    fontSize: 16,
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
    paddingtop: 10,
  },
});
