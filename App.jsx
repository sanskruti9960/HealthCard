import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorSuggestionScreen from './Src/Screens/DoctorSuggestionScreen'
import EmergencyContactScreen from './Src/Screens/EmergencyContactScreen'
import QRScreen from './Src/Screens/QRScreen'
import ProfileScreen from './Src/Screens/ProfileScreen'
import NotificationScreen from './Src/Screens/NotificationScreen'
import ChangePasswordScreen from './Src/Screens/ChangePasswordScreen'

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
