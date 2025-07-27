 {/*
  <NavigationContainer>
    <Stack.Navigator initialRouteName="MedicalReport">
        <Stack.Screen name="MedicalReport" component={MedicalReport} options={{ headerShown: false }} />
       <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{ headerShown: false }} />
       <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{ headerShown: false }} />
       <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{ headerShown: false }} />
     </Stack.Navigator>  
  </NavigationContainer>
  */}
  import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MultiplePolicy from './Src/PalakScreens/MultiplePolicy';
import InsuranceSrc1 from './Src/PalakScreens/InsuranceSrc1';
import InsurancePreview from './Src/PalakScreens/InsurancePreview';
import MedicalReport from './Src/PalakScreens/MedicalReport';
import MedicalInfo from './Src/PalakScreens/MedicalInfo';
import { View } from 'react-native';
import StartInsuranceFile from './Src/PalakScreens/StartInsuranceFile';
const Stack = createNativeStackNavigator();


const App = () => {
  return (
  
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="MedicalInfo">
        <Stack.Screen name="MedicalInfo" component={MedicalInfo} options={{ headerShown: false }} />
        <Stack.Screen name="StartInsuranceFile" component={StartInsuranceFile} options={{ headerShown: false }} />
        <Stack.Screen name="MedicalReport" component={MedicalReport} options={{ headerShown: false }} />
     </Stack.Navigator>
    </NavigationContainer>
  );  
};

export default App;
