import { StyleSheet, Text, View } from 'react-native';
import React,{ useEffect } from 'react';

import HomeScreen from './src/Screen/HomeScreen'
import MedicationCard from './src/Screen/MedicationCard'
import Setschedulepg from './src/Screen/Setschedulepg'
import MultiplePolicy from './src/Screens/MultiplePolicy';
import InsuranceSrc1 from './src/Screens/InsuranceSrc1';
import InsurancePreview from './src/Screens/InsurancePreview';
import ReminderSetupScreen from './src/Screen/ReminderSetupScreen';
import PersonalDetails from './src/Screens/PersonalDetails';
import EmergencyContact from './src/Screens/EmergencyContact';
import MedicalInfo from './src/Screens/MedicalInfo';

import { db } from "./src/firebaseConfig"; // adjust path as needed
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { FormProvider } from './src/Screens/FormContext'; // adjust path as needed
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

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
    <FormProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PersonalDetails">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MedicationCard" component={MedicationCard} options={{ headerShown: false }} />
        <Stack.Screen name="Setschedulepg" component={Setschedulepg} />
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} options={{ headerShown: false }} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{ headerShown: false }} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{ headerShown: false }} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
    </FormProvider>
  );
}

export default App




