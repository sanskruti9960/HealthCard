import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SleepWakeTimeModal = ({ visible, onClose, onSubmit }) => {
  const [sleepTime, setSleepTime] = useState(null);
  const [wakeTime, setWakeTime] = useState(null);
  const [isSleepPickerVisible, setSleepPickerVisible] = useState(false);
  const [isWakePickerVisible, setWakePickerVisible] = useState(false);

  const handleSleepConfirm = (time) => setSleepTime(time);
  const handleWakeConfirm = (time) => setWakeTime(time);

  const calculateSleepHours = (sleep, wake) => {
    const sleepDate = new Date(sleep);
    const wakeDate = new Date(wake);
    if (wakeDate < sleepDate) wakeDate.setDate(wakeDate.getDate() + 1);
    const diff = (wakeDate - sleepDate) / (1000 * 60 * 60);
    return parseFloat(diff.toFixed(2));
  };

  const handleSubmit = () => {
    if (!sleepTime || !wakeTime) {
      alert('Please select both sleep and wake times.');
      return;
    }
    const hours = calculateSleepHours(sleepTime, wakeTime);
    onSubmit({ sleepTime, wakeTime, sleepHours: hours });
    onClose(); // Close modal after successful input
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Set Sleep & Wake Time</Text>

          <TouchableOpacity style={styles.timeButton} onPress={() => setSleepPickerVisible(true)}>
            <Text style={styles.buttonText}>Set Sleep Time</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.timeButton} onPress={() => setWakePickerVisible(true)}>
            <Text style={styles.buttonText}>Set Wake Time</Text>
          </TouchableOpacity>

          <Text style={styles.timeText}>
            💤 Sleep Time: {sleepTime ? sleepTime.toLocaleTimeString() : '--'}
          </Text>
          <Text style={styles.timeText}>
            🌅 Wake Time: {wakeTime ? wakeTime.toLocaleTimeString() : '--'}
          </Text>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          {/* Sleep Time Picker */}
          {isSleepPickerVisible && (
            <DateTimePicker
              value={sleepTime || new Date()}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, selectedDate) => {
                setSleepPickerVisible(false);
                if (selectedDate) handleSleepConfirm(selectedDate);
              }}
            />
          )}

          {/* Wake Time Picker */}
          {isWakePickerVisible && (
            <DateTimePicker
              value={wakeTime || new Date()}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, selectedDate) => {
                setWakePickerVisible(false);
                if (selectedDate) handleWakeConfirm(selectedDate);
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default SleepWakeTimeModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  timeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  timeText: {
    marginTop: 10,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    marginTop: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});
