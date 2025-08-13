import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Onboard from './src/SiddhiScreens/Onboard.jsx';
import Signup from './src/SiddhiScreens/Signup.jsx';
import Login from './src/SiddhiScreens/Login.jsx';
import ForgotPassword from './src/SiddhiScreens/ForgotPassword.jsx';
import OtpVerification from './src/SiddhiScreens/OtpVerification.jsx';
import Terms from './src/PalakScreens/Terms.jsx';
import PersonalDetails from './src/Screens/PersonalDetails.jsx';
import MainTab from './src/Screen/Maintab.jsx';
import MultiplePolicy from './src/Screens/MultiplePolicy.jsx';
import EmergencyContact from './src/Screens/EmergencyContact.jsx';
import InsuranceSrc1 from './src/Screens/InsuranceSrc1.jsx';
import InsurancePreview from './src/Screens/InsurancePreview.jsx';
import MedicalInfo from './src/Screens/MedicalInfo.jsx';
import MedicalReportPreview from './src/PalakScreens/MedicalReportPreview.jsx';
import TermsSrc2 from './src/PalakScreens/TermsSrc2.jsx';
import StartInsuranceFile from './src/PalakScreens/StartInsuranceFile.jsx';
import DoctorSuggestionScreen from './src/Screen/DoctorSuggestionScreen.jsx';
import EmergencyContactScreen from './src/Screen/EmergencyContactScreen.jsx';
import Locationex from './src/SiddhiScreens/Locationex.jsx';
import MeasureScreen from './src/Screen/MeasureScreen.jsx';
import Waterintake from './src/Screen/Waterintake.jsx';
import Bloodoxy from './src/Screen/Bloodoxy.jsx';
import Bloodpress from './src/Screen/Bloodpress.jsx';
import NotificationScreen from './src/Screen/NotificationScreen.jsx';
import ChangePasswordScreen from './src/Screen/ChangePasswordScreen.jsx';
import DoctorBookingScreen from './src/Screen/DoctorBookingScreen.jsx';
import AllRecentVisits from './src/Screen/AllRecentVisits.jsx';
import DocRecommendationScreen from './src/Screen/DocRecommendationScreen.jsx';
import QRScreen from './src/Screen/QRScreen.jsx';
import AccountDetailsScreen from './src/Screen/AccountDetailsScreen.jsx';
import Customloader from './src/Animations/Customloader.js';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null); // null until auth check is done
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in → go to MainTab
        setInitialRoute('MainTab');
      } else {
        // User not signed in → go to Onboard
        setInitialRoute('Onboard');
      }
      setCheckingAuth(false); // auth check done
    });

    return unsubscribe; // cleanup
  }, []);

  if (checkingAuth) {
    // show loader while checking
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Customloader />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {/* Auth screens */}
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />

        {/* Main app */}
        <Stack.Screen name="MainTab" component={MainTab} />

        {/* Other screens */}
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} />
        <Stack.Screen name="EmergencyContact" component={EmergencyContact} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} />
        <Stack.Screen name="MedicalReportPreview" component={MedicalReportPreview} />
        <Stack.Screen name="TermsSrc2" component={TermsSrc2} />
        <Stack.Screen name="StartInsuranceFile" component={StartInsuranceFile} />
        <Stack.Screen name="DoctorSuggestionScreen" component={DoctorSuggestionScreen} />
        <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} />
        <Stack.Screen name="Locationex" component={Locationex} />
        <Stack.Screen name="MeasureScreen" component={MeasureScreen} />
        <Stack.Screen name="Waterintake" component={Waterintake} />
        <Stack.Screen name="Bloodoxy" component={Bloodoxy} />
        <Stack.Screen name="Bloodpress" component={Bloodpress} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="DoctorBookingScreen" component={DoctorBookingScreen} />
        <Stack.Screen name="AllRecentVisits" component={AllRecentVisits} />
        <Stack.Screen name="DocRecommendationScreen" component={DocRecommendationScreen} />
        <Stack.Screen name="QRScreen" component={QRScreen} />
        <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} />
        <Stack.Screen name="Customloader" component={Customloader} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;