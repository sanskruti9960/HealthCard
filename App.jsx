import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalDetails from './Src/PalakScreens/PersonalDetails';
import EmergencyContacts from './Src/PalakScreens/EmergencyContacts';
import ContactModal from './Src/PalakScreens/ContactModal';
import MedicalInfo from './Src/PalakScreens/MedicalInfo';
import MedicalReportPreview from './Src/PalakScreens/MedicalReportPreview';
import MultiplePolicy from './Src/PalakScreens/MultiplePolicy';
import InsuranceSrc1 from './Src/PalakScreens/InsuranceSrc1';
import InsurancePreview from './Src/PalakScreens/InsurancePreview';
import NoInternetModal from './Src/PalakScreens/NoInternetModal';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="PersonalDetails">
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{headerShown: false}} />
          <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} options={{headerShown: false}} />
          <Stack.Screen name="ContactModal" component={ContactModal} options={{headerShown: false}} />
          <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{headerShown: false}} />
          <Stack.Screen name="MedicalReportPreview" component={MedicalReportPreview} options={{headerShown: false}} />
          <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{headerShown: false}} />
          <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{headerShown: false}} />
          <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{headerShown: false}} />
          <Stack.Screen name="NoInternetModal" component={NoInternetModal} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
   
    
  )
}

export default App

