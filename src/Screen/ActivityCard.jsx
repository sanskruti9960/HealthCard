import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, svg } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import SleepTracker from "./SleepTracker"


const { width } = Dimensions.get('window');

const ActivityCard = () => {

  
  return (

    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={HomeStyle.scrollContainer}
    >
      {/* heart beat card*/}
      <Pressable
        style={({ pressed }) => [
          HomeStyle.rectangle,
          {
            transform: [{ scale: pressed ? 1 : 0.95 }],
            backgroundColor: pressed ? '#F8E7EC' : 'white',
            elevation: pressed ? 5 : 2,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', }}>
          <Text style={HomeStyle.Card_title}>Heart</Text>
          <FontAwesome5 name='heartbeat' size={25} color="red" style={HomeStyle.Card_icon} />
        </View>
        <Svg
          height="70"
          width="120"
          viewBox="0 0 110 50"
          style={{ marginTop: 18, marginLeft: 10 }}
        >
          <Path
            d="M0 25 L10 25 L15 10 L20 40 L25 25 L35 25 L40 10 L45 40 L50 25  L120 25"
            stroke="red"
            strokeWidth="2"
            fill="none"
          />
        </Svg>
        <View style={{ flexDirection: 'row', marginLeft: 13, marginTop: 5 }}>
          <Text style={{ color: 'red', fontSize: 25, fontWeight: "bold" }}>70</Text>
          <Text style={{ color: 'grey', fontSize: 20, marginTop: 5, marginLeft: 7 }}>bpm</Text>
        </View>
      </Pressable>


      {/* sleep card */}
      <Pressable
        style={({ pressed }) => [
          HomeStyle.rectangle,
          {
            transform: [{ scale: pressed ? 1 : 0.95 }],
            backgroundColor: pressed ? '#FFF1D6' : 'white',
            elevation: pressed ? 5 : 2,
          },
        ]}
      >
        <View style={{ flexDirection: 'row', }}>
          <Text style={HomeStyle.Card_title}>sleep</Text>
          <FontAwesome5 name='moon' size={25} color="#E6A72F" style={HomeStyle.Card_icon} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SleepTracker />

        </View>
      </Pressable>

{/* stress level card */}
      <Pressable
        style={({ pressed }) => [
          HomeStyle.rectangle,
          {
            transform: [{ scale: pressed ? 1 : 0.95 }],
            backgroundColor: pressed ? '#D0F0C0' : 'white',
            elevation: pressed ? 5 : 2,
          },
        ]}
      >

        <View style={{ flexDirection: 'row', }}>
        <Text style={{  marginLeft: 13,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10}}>Stress Guide</Text>
    <FontAwesome5 name="spa" size={18} color="#4CAF50" style={HomeStyle.Card_icon}/>
</View>
<Text>hii</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          HomeStyle.rectangle,
          {
            transform: [{ scale: pressed ? 1 : 0.95 }],
            backgroundColor: pressed ? '#e0f7ff' : 'blue',
            elevation: pressed ? 5 : 2,
          },
        ]}
      >
        <Text>Press Me</Text>
      </Pressable>


    </ScrollView>


  )
}

export default ActivityCard;

const HomeStyle = StyleSheet.create({
  rectangle: {
    padding: 5,
    width: 150,
    height: 180,
    borderRadius: 20,

    marginRight: 12,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  Card_title: {
    marginLeft: 13,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  Card_icon: {

    position: "absolute",
    top: 10,
    right: 10,
  }
})