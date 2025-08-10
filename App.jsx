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
import Maintab from './src/Screen/Maintab.jsx';

// sarthak
import DoctorSuggestionScreen from './src/Screen/DoctorSuggestionScreen'
import EmergencyContactScreen from './src/Screen/EmergencyContactScreen'
import QRScreen from './src/Screen/QRScreen'
import ProfileScreen from './src/Screen/ProfileScreen'
import NotificationScreen from './src/Screen/NotificationScreen'
import ChangePasswordScreen from './src/Screen/ChangePasswordScreen'
// siiddhi
import ForgotPassword from './src/SiddhiScreens/ForgotPassword.jsx';
import Onboard from './src/SiddhiScreens/Onboard.jsx';
import Signup from './src/SiddhiScreens/Signup.jsx';
import Login from './src/SiddhiScreens/Login.jsx';
import OtpVerification from './src/SiddhiScreens/OtpVerification.jsx';

//palak
import StartInsuranceFile from './src/PalakScreens/StartInsuranceFile';
import MedicalReportPreview from './src/PalakScreens/MedicalReportPreview.jsx';
import Terms from './src/PalakScreens/Terms.jsx';
import TermsSrc2 from './src/PalakScreens/TermsSrc2.jsx';

import { db } from "./src/firebaseConfig"; // adjust path as needed
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
      <Stack.Navigator initialRouteName="Onboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MedicationCard" component={MedicationCard} options={{ headerShown: false }} />
        <Stack.Screen name="Setschedulepg" component={Setschedulepg} options={{ headerShown: false }} />
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{ headerShown: false }} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{ headerShown: false }} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} options={{ headerShown: false }} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{ headerShown: false }} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{ headerShown: false }} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{ headerShown: false }} />
        <Stack.Screen name="Maintab" component={Maintab} options={{headerShown:false}}/>      
        {/* // PalakScreens */}
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




