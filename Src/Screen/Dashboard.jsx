// DashboardCardScreen.js (your real-time data card screen)
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { fetchTodayFitnessData, initGoogleFit } from '../Screen/Utilfit';

const Dashboard = ({ navigation }) => {
  const [data, setData] = useState({ steps: 0, minutes: 0, kcal: 0 });

  useEffect(() => {
    const initialize = async () => {
      const authorized = await initGoogleFit();
      if (authorized) {
        const fitnessData = await fetchTodayFitnessData();
        setData(fitnessData);
      }
    };
    initialize();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Ds', { data })} style={HomeStyle.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <MaterialIcons name="directions-walk" size={20} color="#4A90E2" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{data.steps} Steps</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <Ionicons name="time-outline" size={20} color="#A680FF" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{data.minutes} min</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <FontAwesome5 name="fire" size={20} color="#FBC02D" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold' }}>{data.kcal} kcal</Text>
          </View>
        </View>
        <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <AnimatedCircularProgress size={100} width={6} fill={data.steps / 100} tintColor="#4A90E2" backgroundColor="#e0e0e0" rotation={0}>
            {() => (
              <AnimatedCircularProgress size={80} width={6} fill={data.minutes} tintColor="#A680FF" backgroundColor="#e0e0e0" rotation={0}>
                {() => (
                  <AnimatedCircularProgress size={60} width={6} fill={data.kcal} tintColor="#FBC02D" backgroundColor="#e0e0e0" rotation={0}>
                    {() => (
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}>{data.steps}</Text>
                        <Text style={{ fontSize: 10, color: '#777' }}>Steps</Text>
                      </View>
                    )}
                  </AnimatedCircularProgress>
                )}
              </AnimatedCircularProgress>
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Dashboard;

const HomeStyle = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "95%",
    marginLeft: 10,
    marginTop: 20,
    elevation: 3,
  },
});
