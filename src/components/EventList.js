import React, { useCallback } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';

import colors from '../utills/colors';
import fav from '../assests/fav.png';
import red from '../assests/red.png';
import calendar from '../assests/calendar.png';
import location from '../assests/location.png';
import AppRoutes from '../navigation/AppRoutes';
import { setCurrentEvent, setFavourite } from '../store/slices/eventSlice';

// ✅ Single Event Card
const RenderItem = React.memo(({ item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const favorites = useSelector(state => state.event.favorites);

  const handleFavourite = useCallback(() => {
    const updatedFavorites = favorites.some(e => e.id === item.id)
      ? favorites.filter(e => e.id !== item.id)
      : [...favorites, item];

    dispatch(setFavourite(updatedFavorites));
  }, [dispatch, favorites, item]);

  const handleDetails = useCallback(() => {
    dispatch(setCurrentEvent(item));
    navigation.navigate(AppRoutes.EVENTDETAILSSCREEN);
  }, [dispatch, item]);

  return (
    <TouchableOpacity onPress={handleDetails}>
      <View style={styles.card}>
        {/* Event Image */}
        {item?.images?.[0]?.url ? (
          <Image
            source={{ uri: item.images[0].url, cache: 'force-cache' }}
            style={styles.image}
          />
        ) : (
          <View style={[styles.image, styles.imagePlaceholder]} />
        )}

        {/* Event Details */}
        <View style={styles.mid}>
          <Text style={styles.event} numberOfLines={1}>
            {item?.name || 'Untitled Event'}
          </Text>

          {/* Date */}
          <View style={styles.flex}>
            <Image source={calendar} style={styles.icon} />
            <Text style={styles.date} numberOfLines={1}>
              {item?.dates?.start?.dateTime
                ? dayjs(item.dates.start.dateTime).format('ddd, D MMM YYYY')
                : 'Date TBA'}
            </Text>
          </View>

          {/* Location */}
          <View style={styles.flex}>
            <Image
              source={location}
              style={[styles.icon, { marginRight: 5 }]}
            />
            <Text style={styles.date} numberOfLines={1}>
              {item?._embedded?.venues?.[0]?.address?.line1 ||
                'Unknown Address'}
              {item?._embedded?.venues?.[0]?.city?.name
                ? `, ${item._embedded.venues[0].city.name}`
                : ''}
            </Text>
          </View>
        </View>

        {/* Favourite Button */}
        <TouchableOpacity style={styles.touch} onPress={handleFavourite}>
          <Image
            source={favorites.some(e => e.id === item.id) ? red : fav}
            style={styles.favIcon}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

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
        renderItem={({ item }) => <RenderItem item={item} />}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputColor,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  image: {
    height: 64,
    width: 64,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mid: {
    flex: 1,
    marginLeft: 10,
    marginRight: 40,
  },
  event: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
    flexShrink: 1,
  },
  icon: {
    height: 12,
    width: 12,
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  touch: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  favIcon: {
    height: 24,
    width: 24,
  },
  notFound: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
    paddingTop: 30,
  },
});
