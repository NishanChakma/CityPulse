import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated';
import colors from '../utils/colors';

const SCROLL_TEXT =
  'Most Common search keywords: Hello, Music, Live, Concerts, Theatre, Theater. City Keywords: New York, Chicago, Los Angeles, Paris.';

export default function ScrollingText() {
  const translateX = useSharedValue(5);

  useEffect(() => {
    // Infinite scrolling loop
    translateX.value = withRepeat(
      withTiming(-SCROLL_TEXT.length * 5, { duration: 15000 }),
      -1, // -1 = infinite
      false,
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, animatedStyle]} numberOfLines={1}>
        {SCROLL_TEXT}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    overflow: 'hidden',
    backgroundColor: colors.inputColor,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});
