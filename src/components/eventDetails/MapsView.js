import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import openMaps from '../../assests/openMaps.png';
import { useSelector } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

const MapsView = () => {
  const event = useSelector(state => state.event.currentEvent);
  const latitude = event?._embedded?.venues?.[0]?.location?.latitude;
  const longitude = event?._embedded?.venues?.[0]?.location?.longitude;

  const openGoogleMapsApp = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening maps', err));
  };

  if (!latitude || !longitude) {
    return (
      <View style={styles.container}>
        <Text style={styles.location}>Location not available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.location}>Location</Text>

      <MapView
        style={{ height: 162, width: '100%', borderRadius: 4 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Marker Title"
          description="Marker Description"
        />
      </MapView>

      <TouchableOpacity onPress={openGoogleMapsApp} style={styles.mapsButton}>
        <Image source={openMaps} style={{ height: 20, width: 20 }} />
        <Text style={styles.btnText}>Open In Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapsView;
