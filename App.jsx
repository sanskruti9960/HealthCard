import React from 'react';
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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PersonalDetails"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="EmergencyContacts" component={EmergencyContacts} />
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} />
        <Stack.Screen name="MedicalReportPreview" component={MedicalReportPreview} />
        <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} />
        <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} />
        <Stack.Screen name="InsurancePreview" component={InsurancePreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
