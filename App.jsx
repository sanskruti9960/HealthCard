// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeasureScreen from './Src/Screen/MeasureScreen';
import { View } from 'react-native';
import Bloodpress from "./Src/Screen/Bloodpress"
import HomeScreen from './Src/Screen/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<View style={{flex:1}}>
  <HomeScreen/>
</View>
  );
}
