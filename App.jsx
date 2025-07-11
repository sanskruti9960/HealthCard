import React from 'react';
import { View } from 'react-native';
import DoctorSuggestionScreen from './Src/Screens/DoctorSuggestionScreen'

const App = () => {
  return (
    <View style={{flex:1}}>
      <DoctorSuggestionScreen />
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Homepage">
    //     <Stack.Screen name="Homepage" component={Homepage} />
    //     <Stack.Screen name="Profile" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
