import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import MultiplePolicy from './Src/Screens/MultiplePolicy';
import InsuranceSrc1 from './Src/Screens/InsuranceSrc1';
import InsurancePreview from './Src/Screens/InsurancePreview';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from './Src/Services/firebaseConfig';

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
