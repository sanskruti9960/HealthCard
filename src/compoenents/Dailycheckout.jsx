// components/HealthCard.js
import React, { Children } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';

export default function HealthCard({ title, backgroundColor, value, unit, icon, onPress, children }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [

      styles.card,
      {
        transform: [{ scale: pressed ? 1 : 0.95 }],
        backgroundColor: pressed ? backgroundColor || '#fff' :'white'  ,
        elevation: pressed ? 5 : 3,
      },

    ]}>


      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value} <Text style={styles.unit}>{unit}</Text></Text>
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f2f9ff',
    borderRadius: 16,
    padding: 12,
    margin: 10,
    width: 150,
    height: 170,
    elevation: 4,
    position: 'relative',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 5,
  },
  unit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
  },
  lottie: {
    width: 60,
    height: 60,
  },
});
