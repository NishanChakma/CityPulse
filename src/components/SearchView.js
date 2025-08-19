import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import colors from '../utills/colors';
import search from '../assests/search.png';
import location from '../assests/location.png';
import down from '../assests/down.png';
import PrimaryButton from './PrimaryButton';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <View style={styles.content}>
      {/* Search Events Input */}
      <View style={styles.inputContainer}>
        <View style={styles.searchIcon}>
          <Image source={search} style={{ height: 24, width: 24 }} />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Search events, concerts, sports"
          placeholderTextColor="#888888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* City Selection Input */}
      <TouchableOpacity style={styles.inputContainer}>
        <View style={styles.locationIcon}>
          <Image source={location} style={{ height: 24, width: 24 }} />
        </View>
        <View style={styles.textInputWrapper}>
          <Text
            style={[styles.cityText, !selectedCity && styles.placeholderStyle]}
          >
            {selectedCity || 'Search your City'}
          </Text>
        </View>
        <View style={styles.dropdownIcon}>
          <Image source={down} style={{ height: 8, width: 16 }} />
        </View>
      </TouchableOpacity>

      <PrimaryButton onPress={null} title="Search Events" logo={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    height: 48,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchIcon: {
    marginRight: 12,
  },
  locationIcon: {
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
    opacity: 0.7,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
    padding: 0,
  },
  textInputWrapper: {
    flex: 1,
  },
  cityText: {
    fontSize: 16,
    color: '#ffffff',
  },
  placeholderStyle: {
    color: '#888888',
  },
  dropdownIcon: {
    marginLeft: 12,
  },
});

export default SearchScreen;
