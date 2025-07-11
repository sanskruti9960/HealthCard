
import { Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/Screen/HomeScreen'
import PersonalDetails from './src/Screens/PersonalDetails';
import EmergencyContact from './src/Screens/EmergencyContact';
import MedicalInfo from './src/Screens/MedicalInfo';
import { FormProvider } from './src/Screens/FormContext';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App=()=>{
    return (
    <FormProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PersonalDetails">
          <Stack.Screen name="PersonalDetails" component={PersonalDetails} options={{headerShown:false}}/>
          <Stack.Screen name="EmergencyContact" component={EmergencyContact} options={{headerShown:false}}/>
          <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{headerShown:false}}/>
         <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>

        </Stack.Navigator>
      </NavigationContainer>
    </FormProvider>
  
        

    )
}
export default App
