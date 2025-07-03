import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import HomeStyle from "../../styles/HomeStyle"


const Home = () => {
  const allergies = ["Peanuts", "Dust",]; // Example allergies

  return (
    // main container
    <View style={HomeStyle.main}>
      {/* Topbar container */}
      <View style={HomeStyle.Topbar}>

        <View style={HomeStyle.profile_name}>
          <Text style={{ fontWeight: "bold", fontSize: 17 }}>Hello!</Text>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Sanskruti Bhavsar</Text>

          <Ionicons name="person-circle" size={45} color="skyblue"
            style={HomeStyle.profile_icon} />
        </View>

      </View>

      <View style={HomeStyle.facility}>

        <View style={HomeStyle.fac_singleIcon}>
          <TouchableOpacity style={HomeStyle.fac_iconCnt}>
            <MaterialIcons name="add-call" size={30} color="#0d6e9c" />
          </TouchableOpacity>
          <Text style={{textAlign:'center'}}>Emergency{"\n"} Contact</Text>
         
        </View>

        <View style={HomeStyle.fac_singleIcon}>
        <TouchableOpacity style={HomeStyle.fac_iconCode}>
          <Ionicons name="qr-code-sharp" size={30} color="#E6A72F" />
        </TouchableOpacity>
        <Text style={{textAlign:'center'}}>QR {"\n"}Code</Text>
         </View>

        <View style={HomeStyle.fac_singleIcon}>
        <TouchableOpacity style={HomeStyle.fac_iconRep}>
          <MaterialIcons name="medical-information" size={30} color="#0DBAC6"  />
        </TouchableOpacity>
        <Text style={{textAlign:'center'}}>Medical {"\n"}Reports</Text>
         </View>

        <View style={HomeStyle.fac_singleIcon}>
        <TouchableOpacity style={HomeStyle.fac_iconId}>
          <FontAwesome5 name="id-card" size={28} color="#A9445B" />
        </TouchableOpacity>
        <Text style={{textAlign:'center'}}>Insurance{"\n"} ID</Text>
         </View>

      </View>

      <Text style={{ marginTop: 30, fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>Health Information </Text>


      {/* health information container */}

      <View style={{ flexDirection: 'row', justifyContent: "center", flexWrap: "wrap" }} >

        <View style={{ flexDirection: 'column', flexWrap: "wrap" }}>  {/*blood and allergy container */}

          <View style={HomeStyle.info_blood} >
            <Text style={{ fontSize: 20, margin: 10 }}>Blood Group</Text>
            <Text style={{ fontSize: 30, marginLeft: 10 }}>B+</Text>
          </View>

          <View style={HomeStyle.info_Allergies} >
            <Text style={{ fontSize: 20, margin: 10 }}>Allergies</Text>
            {allergies.map((item, idx) => (
              <Text key={idx} style={{ fontSize: 17, marginLeft: 10, flexWrap: 'wrap', }}>
                {"\u2022"} {item}
              </Text>
            ))}
          </View>

        </View>

        <View style={HomeStyle.info_cond} >
          <Text style={{ fontSize: 25, margin: 10 }}>Medical {'\n'}condition</Text>
        </View>

      </View>








    </View>




  )
}

export default Home

