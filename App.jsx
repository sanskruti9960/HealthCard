import React from "react";
import {Text,View,TouchableOpacity,TextInput,StyleSheet} from 'react-native';
import PersonalDetails from './Src/Screens/PersonalDetails'
const App=()=>{

    return(
        <View style={{flex:1,backgroundColor:'white',padding:10}}>
            <PersonalDetails/>
         </View>

    )
}
export default App
