import React, { useState, useMemo } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const DEFAULT_IMAGES = [
  'https://static.desygner.com/wp-content/uploads/sites/13/2018/04/12110348/cabecerasblog_5_original.jpg',
];

const ImageSlider = () => {
  const event = useSelector(state => state.event.currentEvent);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoize images array to prevent unnecessary recalculations
  const images = useMemo(
    () =>
      event?.images?.length ? event.images.map(img => img.url) : DEFAULT_IMAGES,
    [event],
  );

  return (
    <View style={styles.container}>
      <Carousel
        width={width}
        height={250}
        data={images}
        loop
        autoPlay
        autoPlayInterval={3000}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              accessibilityLabel="Event Image"
            />
          </View>
        )}
      />

      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width,
    height: 250,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#B12300',
  },
});

export default ImageSlider;
