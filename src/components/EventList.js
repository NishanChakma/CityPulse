import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '../utills/colors';
import demo from '../assests/demo.png';
import fav from '../assests/fav.png';
import calendar from '../assests/calendar.png';
import location from '../assests/location.png';
import { useNavigation } from '@react-navigation/native';
import AppRoutes from '../navigation/AppRoutes';

const EventList = () => {
  const navigation = useNavigation();

  const handleDetails = async () => {
    console.log('>>>>>ddd');
    navigation.navigate(AppRoutes.EVENTDETAILSSCREEN);
  };

  const handleFavourite = async () => {
    console.log('>>>>>aaa');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular Events</Text>
      <Text style={styles.des}>Discover what’s happening around you</Text>

      <TouchableOpacity onPress={() => handleDetails()}>
        <View style={styles.card}>
          <Image source={demo} style={{ height: 64, width: 64 }} />
          <View style={styles.mid}>
            <Text style={styles.event} numberOfLines={1} ellipsizeMode="tail">
              SoundStorm Sessions
            </Text>
            <View style={styles.flex}>
              <Image source={calendar} style={{ height: 12, width: 12 }} />
              <Text
                style={[styles.date, { paddingVertical: 5, paddingLeft: 5 }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Mon, Aug 26
              </Text>
            </View>
            <View style={styles.flex}>
              <Image
                source={location}
                style={{ height: 12, width: 12, marginRight: 5 }}
              />
              <Text style={styles.date} numberOfLines={1} ellipsizeMode="tail">
                Central Park, New York
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.touch} onPress={handleFavourite}>
            <Image source={fav} style={{ height: 24, width: 24 }} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: '#fff' }}>{item.title}</Text>
          </View>
        )}
        scrollEnabled={false} // 🔑 Prevent FlatList from scrolling
      /> */}
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  des: {
    fontSize: 16,
    fontWeight: 400,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingBottom: 20,
    paddingHorizontal: 50,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
    backgroundColor: colors.inputColor,
    borderRadius: 2,
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 10,
  },
  mid: {
    overflow: 'hidden',
    flexDirection: 'column',
    paddingLeft: 10,
    marginRight: 90,
  },
  event: {
    fontSize: 16,
    fontWeight: 500,
    color: colors.textPrimary,
    textOverflow: 'ellipsis',
  },
  date: {
    fontSize: 12,
    fontWeight: 400,
    color: colors.textSecondary,
    textOverflow: 'ellipsis',
    width: '90%',
  },
  touch: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 2,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
