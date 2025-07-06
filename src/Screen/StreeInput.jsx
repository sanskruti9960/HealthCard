import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';

const StressInput = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  const stressLevels = [
    { emoji: '😊', label: 'Low' },
    { emoji: '😐', label: 'Medium' },
    { emoji: '😟', label: 'High' },
    { emoji: '😣', label: 'Very High' },
  ];

  const submitStress = () => {
    if (selectedLevel !== null) {
      Alert.alert("Stress Level Recorded", `You selected: ${stressLevels[selectedLevel].label}`);
      navigation.goBack(); // go back to home after submission
    } else {
      Alert.alert("Please select a stress level.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How stressed are you feeling?</Text>
      <View style={styles.emojiContainer}>
        {stressLevels.map((level, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.emojiButton,
              selectedLevel === index && styles.selectedEmoji
            ]}
            onPress={() => setSelectedLevel(index)}
          >
            <Text style={styles.emoji}>{level.emoji}</Text>
            <Text>{level.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button title="Submit" onPress={submitStress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 20, marginBottom: 30 },
  emojiContainer: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 },
  emojiButton: { alignItems: 'center', padding: 10 },
  selectedEmoji: { backgroundColor: '#E0F7FA', borderRadius: 10 },
  emoji: { fontSize: 30 }
});

export default StressInput;
