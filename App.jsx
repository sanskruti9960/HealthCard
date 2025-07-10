import { Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/Screen/HomeScreen'
import MedicationCard from './src/Screen/MedicationCard'
const App = () => {
  return (
    <View style={{flex:1,backgroundColor:'white'}} >
 <HomeScreen/>
 <MedicationCard/>
    </View>
  )
}

export default App

