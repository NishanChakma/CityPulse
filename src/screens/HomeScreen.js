import { Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import colors from '../utills/colors';
import SearchView from '../components/SearchView';
import EventList from '../components/EventList';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t } = useTranslation();
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Text style={styles.text}>
        {t('discover')}{' '}
        <Text style={{ color: colors.primaryLight }}>{t('amazing')}</Text>
      </Text>
      <Text style={styles.des}>{t('find')}</Text>
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
