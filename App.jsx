import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Screens
import HomeScreen from './src/Screen/HomeScreen';
import MedicationCard from './src/Screen/MedicationCard';
import Setschedulepg from './src/Screen/Setschedulepg';
import MultiplePolicy from './src/Screens/MultiplePolicy';
import InsuranceSrc1 from './src/Screens/InsuranceSrc1';
import InsurancePreview from './src/Screens/InsurancePreview';
import ReminderSetupScreen from './src/Screen/ReminderSetupScreen';
import PersonalDetails from './src/Screens/PersonalDetails';
import EmergencyContact from './src/Screens/EmergencyContact';
import MedicalInfo from './src/Screens/MedicalInfo';
import Maintab from './src/Screen/Maintab.jsx';

// sarthak
import DoctorSuggestionScreen from './src/Screen/DoctorSuggestionScreen';
import EmergencyContactScreen from './src/Screen/EmergencyContactScreen';
import QRScreen from './src/Screen/QRScreen';
import ProfileScreen from './src/Screen/ProfileScreen';
import NotificationScreen from './src/Screen/NotificationScreen';
import ChangePasswordScreen from './src/Screen/ChangePasswordScreen';

// siddhi
import ForgotPassword from './src/SiddhiScreens/ForgotPassword.jsx';
import Onboard from './src/SiddhiScreens/Onboard.jsx';
import Signup from './src/SiddhiScreens/Signup.jsx';
import Login from './src/SiddhiScreens/Login.jsx';
import OtpVerification from './src/SiddhiScreens/OtpVerification.jsx';

// palak
import StartInsuranceFile from './src/PalakScreens/StartInsuranceFile';
import MedicalReportPreview from './src/PalakScreens/MedicalReportPreview.jsx';
import Terms from './src/PalakScreens/Terms.jsx';
import TermsSrc2 from './src/PalakScreens/TermsSrc2.jsx';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard" screenOptions={{ headerShown: false }}>

        {/* Flow before showing bottom tab */}
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />

        {/* Main app with bottom tab */}
        <Stack.Screen name="Maintab" component={Maintab} />

        {/* Other screens accessible from Maintab */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MedicationCard" component={MedicationCard} />
        <Stack.Screen name="Setschedulepg" component={Setschedulepg} />
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} />
        <Stack.Screen name="MedicalReportPreview" component={MedicalReportPreview} />
        <Stack.Screen name="TermsSrc2" component={TermsSrc2} />
        <Stack.Screen name="StartInsuranceFile" component={StartInsuranceFile} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="DoctorSuggestionScreen" component={DoctorSuggestionScreen} />
        <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} />
        <Stack.Screen name="QRScreen" component={QRScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;