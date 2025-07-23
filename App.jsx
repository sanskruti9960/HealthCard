import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorSuggestionScreen from './Src/Screen/DoctorSuggestionScreen'
import EmergencyContactScreen from './Src/Screen/EmergencyContactScreen'
import QRScreen from './Src/Screen/QRScreen'
import ProfileScreen from './Src/Screen/ProfileScreen'
import NotificationScreen from './Src/Screen/NotificationScreen'
import ChangePasswordScreen from './Src/Screen/ChangePasswordScreen'

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    // <View style={{ flex: 1 }}>
    //   <ProfileScreen />
    //   {/* <QRScreen /> */}
    //   {/* <EmergencyContactScreen />   */}
    //   {/* <DoctorSuggestionScreen /> */}
    // </View>
     <NavigationContainer>
       <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
         <Stack.Screen name="DoctorSuggestionScreen" component={DoctorSuggestionScreen} />
         <Stack.Screen name="EmergencyContactScreen" component={EmergencyContactScreen} />
         <Stack.Screen name="QRScreen" component={QRScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
          <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        
       </Stack.Navigator>
     </NavigationContainer>
  );
};

export default App;
