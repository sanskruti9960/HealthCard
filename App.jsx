import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MultiplePolicy from './Src/PalakScreens/MultiplePolicy';
import InsuranceSrc1 from './Src/PalakScreens/InsuranceSrc1';
import InsurancePreview from './Src/PalakScreens/InsurancePreview';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
     
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MultiplePolicy">
         <Stack.Screen name="MultiplePolicy" component={MultiplePolicy} options={{ headerShown: false }} />
         <Stack.Screen name="InsuranceSrc1" component={InsuranceSrc1} options={{ headerShown: false }} />
         <Stack.Screen name="InsurancePreview" component={InsurancePreview} options={{ headerShown: false }} />
       </Stack.Navigator> 
    </NavigationContainer>
   
  );
};

export default App;
