import { Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import colors from '../utills/colors';
import SearchView from '../components/SearchView';
import EventList from '../components/EventList';

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.text}>
        Discover{' '}
        <Text style={{ color: colors.primaryLight }}>Amazing Event</Text>
      </Text>
      <Text style={styles.des}>
        Find concerts, sports, theater, and more in your city
      </Text>
      <SearchView />
      <EventList />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: 700,
    color: colors.textPrimary,
    textAlign: 'center',
    paddingVertical: 20,
    letterSpacing: -1,
  },
  des: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.textSecondary,
    textAlign: 'center',
    letterSpacing: -0.5,
    paddingHorizontal: 80,
  },
});
