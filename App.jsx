import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboard1 from './src/Screens/Onboard1';
import Signup from './src/Screens/Signup';
import Login from './src/Screens/Login';
import ForgotPassword from './src/Screens/ForgotPassword';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard1" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboard1" component={Onboard1} />
        <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
