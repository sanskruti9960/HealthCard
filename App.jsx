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
// siiddhi
import ForgotPassword from './Src/SiddhiScreens/ForgotPassword.jsx';
import Onboard from './Src/SiddhiScreens/Onboard.jsx';
import Signup from './Src/SiddhiScreens/Signup.jsx';
import Login from './Src/SiddhiScreens/Login.jsx';
import OtpVerification from './Src/SiddhiScreens/OtpVerification.jsx';
//palak
import StartInsuranceFile from './Src/PalakScreens/StartInsuranceFile';
import MedicalReportPreview from './Src/PalakScreens/MedicalReportPreview.jsx';
import Terms from './Src/PalakScreens/Terms.jsx';
import TermsSrc2 from './Src/PalakScreens/TermsSrc2.jsx';

import { db } from "./Src/firebaseConfig"; // adjust path as needed
import { Provider as PaperProvider } from 'react-native-paper';
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
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MedicationCard" component={MedicationCard} options={{ headerShown: false }} />
        <Stack.Screen name="Setschedulepg" component={Setschedulepg} options={{ headerShown: false }} />
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} options={{ headerShown: false }} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{ headerShown: false }} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{ headerShown: false }} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{ headerShown: false }} />
        {/* PalakScreens */}
         <Stack.Screen name="MedicalReportPreview" component={MedicalReportPreview} options={{ headerShown: false }} />
         <Stack.Screen name="Terms" component={Terms} options={{ headerShown: false }} />
         <Stack.Screen name="TermsSrc2" component={TermsSrc2} options={{ headerShown: false }} />
         <Stack.Screen name="StartInsuranceFile" component={StartInsuranceFile} options={{ headerShown: false }} />

{/* sarthak */}
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
         <Stack.Screen name="DoctorSuggestionScreen" component={DoctorSuggestionScreen} options={{ headerShown: false }} />
         <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} options={{ headerShown: false }} />
         <Stack.Screen name="QRScreen" component={QRScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={{ headerShown: false }} />
      {/* siidhi */}
         <Stack.Screen name="Onboard" component={Onboard} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }}/>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="OtpVerification" component={OtpVerification} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App




