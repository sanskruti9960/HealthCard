import React from "react";
import {Text,View,TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import PersonalDetails from './Src/Screens/PersonalDetails'
import EmergencyContact from "./Src/Screens/EmergencyContact";
import MedicalInfo from "./Src/Screens/MedicalInfo";
import { FormProvider } from "./Src/Screens/FormContext";
import Styling from "./Src/Screens/Styling";


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
        </Stack.Navigator>
      </NavigationContainer>
    </FormProvider>
  
        

    )
}
export default App
