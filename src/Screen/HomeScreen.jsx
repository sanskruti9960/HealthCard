import { Text, View, TouchableOpacity, Image, ScrollView,ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import HomeStyle from "../../styles/HomeStyle"
import ActivityCard from "./ActivityCard"
import Dailycheckout from "../compoenents/Dailycheckout"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Svg, { Path } from 'react-native-svg'
import { doc, getDoc } from 'firebase/firestore';
import auth from '@react-native-firebase/auth';
import { db } from '../firebaseConfig'; // your firebase config file

const HomeScreen = () => {
  
  // ===============for database of name , prfileimage =================
 const [fullName, setFullName] = useState('');
      const user = auth().currentUser;

useEffect(() => {
  const fetchUserData = async () => {
          const userId = user.uid;
    try {
      const docRef = doc(db, 'Siddhi', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setFullName(userData.fullName || '');
      } else {
        console.log('No such user!');
      }
    } catch (error) {
      console.error('Error getting user data:', error);
    }
  };

  fetchUserData();
}, []);


 
  // =====================================================
  return (
    // main container
    <View style={HomeStyle.main}>
      {/* Topbar container */}
      <View style={HomeStyle.Topbar}>

        <View style={HomeStyle.profile_name}>
          <Text style={{ fontWeight: "500", fontSize: 19 , marginLeft:10,}}>{`👋 Hello, ${fullName} `}</Text>

  <Ionicons
    name="person-circle"
    size={45}
    color="skyblue"
    style={HomeStyle.profile_icon}
  />

        </View>
      </View>
      <ScrollView style={HomeStyle.main} contentContainerStyle={{ paddingBottom: 20 }}>

        {/* stpes progress bar */}

        <View style={HomeStyle.card}>
          {/* Left side: Icons and counts */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            {/* Left icons and values */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <MaterialIcons name="directions-walk" size={20} color="#4A90E2" />
                <Text style={{ marginLeft: 5 }}>4567 Steps</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <Ionicons name="time-outline" size={20} color="#A680FF" />
                <Text style={{ marginLeft: 5 }}>42 min</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                <FontAwesome5 name="fire" size={20} color="#FBC02D" />
                <Text style={{ marginLeft: 5 }}>123 kcal</Text>
              </View>
            </View>

            {/* Right side: Stacked circles */}
            <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
              {/* Outer circle - Steps */}
              <AnimatedCircularProgress
                size={100}
                width={6}
                fill={80}
                tintColor="#4A90E2"
                backgroundColor="#e0e0e0"
                rotation={0}
                lineCap="round"
              >
                {
                  () => (
                    <AnimatedCircularProgress
                      size={80}
                      width={6}
                      fill={60}
                      tintColor="#A680FF" // pastel purple
                      backgroundColor="#e0e0e0"
                      rotation={0}
                      lineCap="round"
                    >
                      {
                        () => (
                          <AnimatedCircularProgress
                            size={60}
                            width={6}
                            fill={50}
                            tintColor="#FBC02D"
                            backgroundColor="#e0e0e0"
                            rotation={0}
                            lineCap="round"
                          >
                            {
                              () => (
                                <View style={{ alignItems: 'center' }}>
                                  <Text style={{ fontWeight: 'bold', fontSize: 12 }}>4567</Text>
                                  <Text style={{ fontSize: 10, color: '#777' }}>Steps</Text>
                                </View>
                              )
                            }
                          </AnimatedCircularProgress>
                        )
                      }
                    </AnimatedCircularProgress>
                  )
                }
              </AnimatedCircularProgress>
            </View>
          </View>
        </View>

        <Text style={{ marginTop: 20, fontSize: 20, marginLeft: 10, fontWeight: "bold" }}>service</Text>

        {/* four icons  */}
        <View style={HomeStyle.facility}>

          <View style={HomeStyle.fac_singleIcon}>
            <TouchableOpacity style={HomeStyle.fac_iconCnt}>
              <MaterialIcons name="add-call" size={30} color="#0d6e9c" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center' }}>Emergency{"\n"} Contact</Text>

          </View>

          <View style={HomeStyle.fac_singleIcon}>
            <TouchableOpacity style={HomeStyle.fac_iconCode}>
              <Ionicons name="qr-code-sharp" size={30} color="#E6A72F" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center' }}>QR {"\n"}Code</Text>
          </View>

          <View style={HomeStyle.fac_singleIcon}>
            <TouchableOpacity style={HomeStyle.fac_iconRep}>
              <MaterialIcons name="medical-information" size={30} color="#0DBAC6" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center' }}>Medical {"\n"}Reports</Text>
          </View>

          <View style={HomeStyle.fac_singleIcon}>
            <TouchableOpacity style={HomeStyle.fac_iconId}>
              <FontAwesome5 name="id-card" size={28} color="#A9445B" />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center' }}>Insurance{"\n"} ID</Text>
          </View>

        </View>

        {/* doctor container */}
        <TouchableOpacity style={{
          backgroundColor: '#d6f0fa', paddingLeft: 10, flexDirection: 'row', margin: 10,
          borderRadius: 25, alignItems: 'center', justifyContent: 'space-between', borderLeftWidth: 5,
          borderLeftColor: '#0d6e9c', paddingVertical: 55
        }}>

          <View style={{ flexDirection: 'column', }}>
            <Text style={{ color: "#0d6e9c", fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Get the Best {"\n"}Medical Services</Text>
            <Text style={{ color: "gray", fontSize: 10 }}>we provide best quality medical {'\n'} Services without further cost</Text>
          </View>

          <Image
            source={require('../img/doc.png')}
            style={{
              flex: 1,
              height: '230%',
              width: '170%',
              resizeMode: 'contain',


            }}
          />

        </TouchableOpacity>


        {/* activity information container */}

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingHorizontal: 11 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Activity</Text>

          <TouchableOpacity>
            <Text style={{ fontSize: 15, color: '#007AFF' }}>Record</Text>
          </TouchableOpacity>
        </View>
        <ActivityCard />


        {/* Dailycheckout 4 cards */}
        <Text style={{ fontSize: 20, fontWeight: 'bold',marginLeft:10 }}>Vital Health Stats</Text>
        <View style={HomeStyle.container}>
          <View style={HomeStyle.row}>
            {/* heart rate card */}
            <Dailycheckout
            
              title="Heart Rate"
               subtitle="Check your BPM"
              backgroundColor='#F8E7EC'
            >
              <Image
                source={require('../img/heart.png')}
                style={{

                  width: 120,
                  height: 120,
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  opacity: 0.9,
                  marginBottom: -27
                }}
                resizeMode='contain'
              />
            </Dailycheckout>

            {/* blood pressure card */}
            <Dailycheckout
              title="BP Tracker"
               subtitle="Track your heart’s pressure"
              backgroundColor='#E3E6FA'
            >    <Image
                source={require('../img/pressure.png')}
                style={{

                  width: 90,
                  height: 90,
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  opacity: 0.9,
                  marginBottom: -10
                }}
                resizeMode='contain'
              />
            </Dailycheckout>

          </View>
          <View style={HomeStyle.row}>

            {/* blood  oxygen card */}
            <Dailycheckout
              title="Blood Oxygen"
               subtitle="See how well you breathe"
              backgroundColor='#EAEAFB'

            > <Image
                source={require('../img/oxy.png')}
                style={{

                  width: 100,
                  height: 100,
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  opacity: 0.9,
                  marginBottom: -18

                }}
                resizeMode='contain'
              />
            </Dailycheckout>

            {/* water card   */}
            <Dailycheckout
              title="Water Intake"
               subtitle="Log your daily water"
              backgroundColor='#d6f0fa'

            > <Image
                source={require('../img/water.png')}
                style={{

                  width: 100,
                  height: 100,
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  opacity: 0.9,
                  marginBottom: -13
                }}
                resizeMode='contain'
              />
            </Dailycheckout>

          </View>
        </View>
      </ScrollView>

    </View>


  )
}

export default HomeScreen

