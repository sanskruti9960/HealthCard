// LocalRealTimeFitness.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const LocalRealTimeFitness = () => {
  const [steps, setSteps] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [kcal, setKcal] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      // Simulating step count increase (e.g., +2 steps/sec)
      setSteps(prev => {
        const newSteps = prev + 2; 
        setMinutes(Math.floor(newSteps / 100)); // assuming 100 steps/min
        setKcal((newSteps * 0.04).toFixed(2)); // kcal burned per step
        return newSteps;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Local Real-Time Fitness Data</Text>

      <View style={styles.row}>
        <View style={styles.card}>
          <MaterialIcons name="directions-walk" size={24} color="#4A90E2" />
          <Text style={styles.value}>{steps}</Text>
          <Text style={styles.label}>Steps</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="time-outline" size={24} color="#A680FF" />
          <Text style={styles.value}>{minutes}</Text>
          <Text style={styles.label}>Minutes</Text>
        </View>

        <View style={styles.card}>
          <FontAwesome5 name="fire" size={24} color="#FBC02D" />
          <Text style={styles.value}>{kcal}</Text>
          <Text style={styles.label}>Kcal</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={180}
          width={10}
          fill={(steps / 10000) * 100}
          tintColor="#4A90E2"
          backgroundColor="#e0e0e0"
          rotation={0}
        >
          {() => (
            <AnimatedCircularProgress
              size={140}
              width={10}
              fill={(minutes / 60) * 100}
              tintColor="#A680FF"
              backgroundColor="#e0e0e0"
              rotation={0}
            >
              {() => (
                <AnimatedCircularProgress
                  size={100}
                  width={10}
                  fill={(kcal / 500) * 100}
                  tintColor="#FBC02D"
                  backgroundColor="#e0e0e0"
                  rotation={0}
                >
                  {() => (
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{steps}</Text>
                      <Text style={{ fontSize: 12, color: '#777' }}>Steps</Text>
                    </View>
                  )}
                </AnimatedCircularProgress>
              )}
            </AnimatedCircularProgress>
          )}
        </AnimatedCircularProgress>
      </View>
    </ScrollView>
  );
};

export default LocalRealTimeFitness;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 8,
    width: 100,
    elevation: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginTop: 20,
  },
});
