import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import styles from './styles';
import openMaps from '../../assests/openMaps.png';

const MapsView = () => {
  const latitude = 23.8103;
  const longitude = 90.4125;

  const openGoogleMapsApp = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.location}>Location</Text>
      <TouchableOpacity onPress={openGoogleMapsApp} style={styles.mapsButton}>
        <Image source={openMaps} style={{ height: 20, width: 20 }} />
        <Text style={styles.btnText}>Open In Maps</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MapsView;
