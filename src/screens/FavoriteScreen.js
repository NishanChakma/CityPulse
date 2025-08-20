import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import EventCard from '../components/EventCard';
import colors from '../utils/colors';
import { useTranslation } from 'react-i18next';

const FavoriteScreen = () => {
  const { t } = useTranslation();
  const favorites = useSelector(state => state.event.favorites);

  return (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <Text style={styles.fav}>{t('favourite')}</Text>
      {favorites?.length === 0 && (
        <Text style={styles.noFav}>{t('noFavorite')}</Text>
      )}
      <FlatList
        data={favorites}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <EventCard item={item} />}
        scrollEnabled={false} // keep parent ScrollView scrolling
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  fav: {
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'center',
    fontWeight: 700,
    paddingBottom: 20,
    paddingTop: 10,
  },
  noFav: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
  },
});
