import { StyleSheet, Text, View } from 'react-native';
import React,{ useEffect } from 'react';

import HomeScreen from './Src/Screen/HomeScreen'
import MedicationCard from './Src/Screen/MedicationCard'
import Setschedulepg from './Src/Screen/Setschedulepg'
import MultiplePolicy from './Src/Screens/MultiplePolicy';
import InsuranceSrc1 from './Src/Screens/InsuranceSrc1';
import InsurancePreview from './Src/Screens/InsurancePreview';
import ReminderSetupScreen from './Src/Screen/ReminderSetupScreen';
import PersonalDetails from './Src/Screens/PersonalDetails';
import EmergencyContact from './Src/Screens/EmergencyContact';
import MedicalInfo from './Src/Screens/MedicalInfo';
// sarthak
import DoctorSuggestionScreen from './Src/Screen/DoctorSuggestionScreen'
import EmergencyContactScreen from './Src/Screen/EmergencyContactScreen'
import QRScreen from './Src/Screen/QRScreen'
import ProfileScreen from './Src/Screen/ProfileScreen'
import NotificationScreen from './Src/Screen/NotificationScreen'
import ChangePasswordScreen from './Src/Screen/ChangePasswordScreen'

import { db } from "./Src/firebaseConfig"; // adjust path as needed
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { FormProvider } from './Src/Screens/FormContext'; // adjust path as needed
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
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MedicationCard" component={MedicationCard} options={{ headerShown: false }} />
        <Stack.Screen name="Setschedulepg" component={Setschedulepg} />
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} options={{ headerShown: false }} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{ headerShown: false }} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{ headerShown: false }} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{ headerShown: false }} />
{/* sarthak */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
         <Stack.Screen name="DoctorSuggestionScreen" component={DoctorSuggestionScreen} />
         <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} />
         <Stack.Screen name="QRScreen" component={QRScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </FormProvider>
  );
}

export default App




