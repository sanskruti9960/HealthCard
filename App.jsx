import { Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/Screen/HomeScreen'
import MedicationCard from './src/Screen/MedicationCard'
import Setschedulepg from './src/Screen/Setschedulepg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from "./src/firebaseConfig"; // adjust path as needed
import ReminderSetupScreen from './src/Screen/ReminderSetupScreen';
import { useEffect } from 'react';
import notifee, { AndroidImportance } from '@notifee/react-native';

const App = () => {
    useEffect(() => {
    async function setupNotifications() {
      await notifee.requestPermission();
      await notifee.createChannel({
        id: 'reminder',
        name: 'Reminder Notifications',
        importance: AndroidImportance.HIGH,
      });
    }

    setupNotifications();
  }, []);
  return (
    <View style={{flex:1,backgroundColor:'white'}} >
 {/* <HomeScreen/> */}
 {/* <MedicationCard/> */}
 <Setschedulepg/>
 {/* <ReminderSetupScreen/> */}

    </View>
  )
}

export default App

