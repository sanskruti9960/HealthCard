import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import ForgotPassword from './src/Screens/ForgotPassword.jsx';
import Onboard from './src/Screens/Onboard.jsx';
import Signup from './src/Screens/Signup.jsx';
import Login from './src/Screens/Login.jsx';
import OtpVerification from './src/Screens/OtpVerification.jsx';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
   
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboard" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboard" component={Onboard} />
        <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
