import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorSuggestionScreen from './Src/Screen/DoctorSuggestionScreen'
import EmergencyContactScreen from './Src/Screen/EmergencyContactScreen'
import QRScreen from './Src/Screen/QRScreen'
import ProfileScreen from './Src/Screen/ProfileScreen'
import ChangePasswordScreen from './Src/Screen/ChangePasswordScreen'
import Dashboard from './Src/Screen/Dashboard'
import Ds from './Src/Screen/Ds'
import AccountDetailsScreen from './Src/Screen/AccountDetailsScreen'
import PrivacyPolicyScreen from './Src/Screen/PrivacyPolicyScreen'
import DoctorBookingScreen from './Src/Screen/DoctorBookingScreen'
import AllRecentVisits from './Src/Screen/AllRecentVisits'
import DocRecommendationScreen from './Src/Screen/DocRecommendationScreen'


const Stack = createNativeStackNavigator();
const App = () => {
  
  return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
         <Stack.Screen name="DoctorSuggestionScreen" component={DoctorSuggestionScreen} />
         <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} />
         <Stack.Screen name="QRScreen" component={QRScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Ds" component={Ds} />
          <Stack.Screen name="AccountDetailsScreen" component={AccountDetailsScreen} />
          <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
          <Stack.Screen name="DoctorBookingScreen" component={DoctorBookingScreen} />
          <Stack.Screen name="AllRecentVisits" component={AllRecentVisits} />
          <Stack.Screen name="DocRecommendationScreen" component={DocRecommendationScreen} />
          
          
  
       </Stack.Navigator>
     </NavigationContainer>
  );
};

export default App;
