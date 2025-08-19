import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import colors from '../utills/colors';
import searchIcon from '../assests/search.png';
import locationIcon from '../assests/location.png';
import PrimaryButton from './PrimaryButton';
import Loading from './Loading';
import API from '../services/api';
import ShowMessage from './ShowMessage';
import { setEvents } from '../store/slices/eventSlice';

const SearchScreen = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ query: '', city: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const fetchData = async () => {
    if (!form.query.trim() && !form.city.trim()) {
      return ShowMessage('Please enter an event name or city to search.');
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await API.getEvents(form.query, form.city);

      const events =
        res?.status === 200 && res?.data?._embedded?.events
          ? res.data._embedded.events
          : [];

      dispatch(setEvents(events));

      if (events.length === 0) {
        ShowMessage('No events found matching your search.', true);
      }
    } catch (err) {
      ShowMessage(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loading />}

      {/* Event Search Input */}
      <InputField
        icon={searchIcon}
        placeholder="Search events, concerts, sports"
        value={form.query}
        onChangeText={text => handleChange('query', text)}
      />

      {/* City Search Input */}
      <InputField
        icon={locationIcon}
        placeholder="Search your city"
        value={form.city}
        onChangeText={text => handleChange('city', text)}
      />

      <PrimaryButton
        onPress={fetchData}
        title="Search Events"
        logo={searchIcon}
      />
    </View>
  );
};

const InputField = ({ icon, placeholder, value, onChangeText }) => (
  <View style={styles.inputContainer}>
    <Image source={icon} style={styles.icon} />
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor="#888888"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputColor,
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  icon: {
    height: 22,
    width: 22,
    marginRight: 10,
    tintColor: colors.textPrimary,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
});

export default SearchScreen;
