// 
// =============================================================
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonalDetails from './Src/PalakScreens/PersonalDetails';
import MedicalInfo from './Src/PalakScreens/MedicalInfo';
import MedicalReportPreview from './Src/PalakScreens/MedicalReportPreview';
import MultiplePolicy from './Src/PalakScreens/MultiplePolicy';
import InsuranceSrc1 from './Src/PalakScreens/InsuranceSrc1';
import InsurancePreview from './Src/PalakScreens/InsurancePreview';
import EmergencyContact from './Src/PalakScreens/EmergencyContacts';
import SidLogin from './Src/PalakScreens/SidLogin';
import NoInternetModal from './Src/PalakScreens/NoInternetModal';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="SidLogin" component={SidLogin} options={{headerShown: false}} /> */}
       <Stack.Screen name="EmergencyContact" component={EmergencyContact} options={{headerShown: false}} />
        {/* <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{headerShown: false}} /> */}
         {/* <Stack.Screen name="MedicalReportPreview" component={MedicalReportPreview} options={{headerShown: false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
   
    
  )
}

export default App
// ======================================================================================================

