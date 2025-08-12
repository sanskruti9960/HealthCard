import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Customloader({
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  visible = true, // parent passes loading here
  minVisibleTime = 1000, // 1 second minimum
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [shouldShow, setShouldShow] = useState(visible);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (visible) {
      // Show immediately and record start time
      startTimeRef.current = Date.now();
      setShouldShow(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Calculate how long loader has been visible
      const elapsed = Date.now() - startTimeRef.current;
      const delay = elapsed < minVisibleTime ? minVisibleTime - elapsed : 0;

      // Delay hiding to meet minimum visible time
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShouldShow(false);
        });
      }, delay);
    }
  }, [visible]);

  if (!shouldShow) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        { width, height, opacity: fadeAnim },
      ]}
    >
      <LottieView
        source={require('./Loader.json')}
        loop={loop}
        autoPlay={autoplay}
        style={styles.lottie}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
