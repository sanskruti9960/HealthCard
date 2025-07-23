import React,{useState} from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { saveReminderToFirestore } from '../services/firestoreSrevice';
import { triggerTestNotification } from '../utils/Notifications';
import notifee from '@notifee/react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or Feather, Ionicons, etc.

const ReminderSetupScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const toggleNotifications = async () => {
  const newState = !notificationsEnabled;
  setNotificationsEnabled(newState);

  if (newState) {
    // 🔔 ENABLE all reminders (re-schedule them)
    const userId = 'testUser123'; // Replace with auth().currentUser.uid
    await scheduleReminder(userId); // Reschedules all reminders
    Alert.alert('Notifications Enabled');
  } else {
    // 🔕 DISABLE all reminders
    await notifee.cancelAllNotifications();
    Alert.alert('Notifications Disabled');
  }
};

  const handleSave = async () => {
    console.log("🔔 Save button pressed");

    const userId = "testUser123"; // ✅ Temporary for testing

    const reminder = {
      medicationId: "abc123",
      name: "Paracetamol",
      frequency: "weekly",
      weekdays: ["monday", "friday"],
      times: ["08:00", "18:00"],
      dosage: 1,
      startDate: "2025-07-21",
      tabletCount: 10,
      userId: userId,
    };

    try {
      console.log("📦 Saving to Firestore:", reminder);
      await saveReminderToFirestore(reminder);
      console.log("✅ Saved to Firestore");

      console.log("⏰ Scheduling reminder...");
      await scheduleReminder(reminder);
      console.log("✅ Reminder scheduled");

      Alert.alert("Reminder Saved", `Reminder for ${reminder.name} has been saved.`);
    } catch (e) {
      console.error("❌ Error during save:", e);
      Alert.alert("Error", e.message);
    }
  };



  return (
    <View>

 <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        marginTop: 10,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
        Get reminder to take medicine
      </Text>

      <TouchableOpacity onPress={toggleNotifications}>
        <Icon
          name={notificationsEnabled ? 'bell-ring' : 'bell-off'}
          size={28}
          color={notificationsEnabled ? '#4CAF50' : '#F44336'}
        />
      </TouchableOpacity>
    </View>


      <TouchableOpacity
        onPress={handleSave}
        style={{ backgroundColor: '#4CAF50', padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>save remainder</Text>
      </TouchableOpacity>

  <TouchableOpacity
  onPress={triggerTestNotification}
  style={{ backgroundColor: '#2196F3', padding: 12, borderRadius: 8, marginBottom: 20 }}
>
  <Text style={{ color: 'white', textAlign: 'center' }}>Test Notification</Text>
</TouchableOpacity>

    </View>
  );  
};

export default ReminderSetupScreen;
