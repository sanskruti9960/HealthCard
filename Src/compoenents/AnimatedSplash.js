// src/components/AnimatedSplash.js
import React, {useEffect, useRef} from 'react';
import {Animated, View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import BootSplash from 'react-native-bootsplash';

const {width} = Dimensions.get('window');

export default function AnimatedSplash({onDone = () => {}}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    // Step A: ensure native bootsplash is hidden (fade) when navigation/JS ready:
    BootSplash.hide({fade: true});

    // Step B: animate in, then animate out
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {toValue: 1, duration: 700, useNativeDriver: true}),
        Animated.spring(scale, {toValue: 1, friction: 6, useNativeDriver: true})
      ]),
      Animated.delay(800),
      Animated.timing(opacity, {toValue: 0, duration: 450, useNativeDriver: true})
    ]).start(() => onDone());
  }, []);

  return (
    <Animated.View style={[styles.container, {opacity}]}>
      <Animated.Image
        source={require('../assets/bootsplash/logo.png')} // put logo at assets/logo.png
        style={[styles.logo, {transform: [{scale}]}]}
        resizeMode="contain"
      />
      <Text style={styles.title}>Health Card</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#7FBCE5', // your pastel color
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  logo: { width: Math.min(160, width * 0.4), height: Math.min(160, width * 0.4), marginBottom: 18 },
  title: { color: 'white', fontSize: 22, fontWeight: '700' },
});
