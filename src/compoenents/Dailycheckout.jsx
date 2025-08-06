// components/HealthCard.js
import React, { Children } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function HealthCard({ title, backgroundColor, subtitle, onPress, children }) {
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
      <Text style={styles.subtitle}>{subtitle || 'Tap to explore'}</Text>
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
  lottie: {
    width: 60,
    height: 60,
  },
  subtitle: {
  fontSize: 12,
  fontWeight: '450',
  color: '#666',
  marginTop: 5,
},

});
