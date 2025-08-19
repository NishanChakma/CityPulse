import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Platform,
  Animated,
  Easing,
  Text,
} from 'react-native';
import loading from '../assests/love.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Loading = ({ isLoading, onRequestClose, fromTab }) => {
  const spinAnim = new Animated.Value(0);
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  const marginBottomAdd = Platform.OS === 'android' ? 64 : 40;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  });

  return (
    <Modal
      transparent
      presentationStyle="overFullScreen"
      animationType="fade"
      visible={isLoading}
      onRequestClose={onRequestClose}
    >
      <View
        style={[
          styles.container,
          {
            marginBottom: fromTab
              ? useSafeAreaInsets().bottom + marginBottomAdd
              : 0,
          },
        ]}
      >
        <View style={styles.wrap}>
          <Text style={styles.load}>Loading...</Text>
          <Animated.Image
            source={loading}
            style={[
              styles.loaderImageStyle,
              {
                transform: [{ rotate: spin }],
              },
            ]}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 38, 38, 0.3)',
  },
  loaderImageStyle: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    opacity: 0.8,
  },
  load: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    paddingRight: 10,
  },
  wrap: { flexDirection: 'row', alignItems: 'center' },
});
