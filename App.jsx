import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import ProfileScreen from "./Src/Screens/ProfileScreen";

const App=()=>{
  return(
    <View style={{flex:1}}>
      <ProfileScreen />
    </View>
  )
}
export default App;
