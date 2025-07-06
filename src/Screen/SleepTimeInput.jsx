import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const SleepTimeInput = ({ onSleepHoursCalculated }) => {
  const [sleepTime, setSleepTime] = useState(null);
  const [wakeTime, setWakeTime] = useState(null);
  const [isSleepPickerVisible, setSleepPickerVisible] = useState(false);
  const [isWakePickerVisible, setWakePickerVisible] = useState(false);

  const showSleepPicker = () => setSleepPickerVisible(true);
  const showWakePicker = () => setWakePickerVisible(true);

  const handleSleepConfirm = (date) => {
    setSleepTime(date);
    setSleepPickerVisible(false);
  };

  const handleWakeConfirm = (date) => {
    setWakeTime(date);
    setWakePickerVisible(false);
    if (sleepTime) {
      const hours = calculateSleepHours(sleepTime, date);
      onSleepHoursCalculated(hours);
    }
  };

  const calculateSleepHours = (sleep, wake) => {
    if (wake <= sleep) wake.setDate(wake.getDate() + 1); // next day
    const diffMs = wake - sleep;
    return +(diffMs / (1000 * 60 * 60)).toFixed(2); // convert ms to hours
  };

  return (
    <View>
      <Button title="Set Sleep Time" onPress={showSleepPicker} />
      <Button title="Set Wake Time" onPress={showWakePicker} />
      <Text>
        Sleep Time: {sleepTime ? sleepTime.toLocaleTimeString() : '--'}
      </Text>
      <Text>
        Wake Time: {wakeTime ? wakeTime.toLocaleTimeString() : '--'}
      </Text>

      <DateTimePickerModal
        isVisible={isSleepPickerVisible}
        mode="time"
        onConfirm={handleSleepConfirm}
        onCancel={() => setSleepPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={isWakePickerVisible}
        mode="time"
        onConfirm={handleWakeConfirm}
        onCancel={() => setWakePickerVisible(false)}
      />
    </View>
  );
};

export default SleepTimeInput;
