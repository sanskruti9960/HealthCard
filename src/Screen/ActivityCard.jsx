import { StyleSheet, Text, View, Pressable, Button, Alert, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import SleepTracker from "./SleepTracker"
import LottieView from 'lottie-react-native';
import SleepWakeTimeModal from '../compoenents/SleepWakeTimeModal';
import MedicationCard from "./MedicationCard"

const { width } = Dimensions.get('window');

const ActivityCard = () => {

  // sleep card values passed to sleep tracker
  const [modalSleep, setmodalSleep] = useState(false)
  const [sleepmodaldata, setsleepmodaldata] = useState([]);
  const handleModalSubmit = (data) => {
    setsleepmodaldata([data]);  // ✅ ensures data is an array
  };

  //  stress Guide card
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)

  const stressLevels = [
    { emoji: '😊', label: 'Low' },
    { emoji: '😐', label: 'Medium' },
    { emoji: '😟', label: 'High' },
    { emoji: '😣', label: 'Very High' },
  ];

  const submitStress = () => {
    if (selectedLevel !== null) {
      Alert.alert(
        "Stress Level Recorded",
        `You selected: ${stressLevels[selectedLevel].label}`,
        [
          {
            text: "OK",
            onPress: () => setModalOpen(!modalOpen),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("Please select a stress level.");
    }
  };

  const getSuggestion = () => {
    if (selectedLevel === null) return "";

    const suggestions = {
      0: "Great! Keep up the positivity! 😊",
      1: "Take a short break or go for a walk. 🌿",
      2: "Try breathing exercises or light exercise. 🧘‍♂️",
      3: "Consider meditation or watch this: https://youtu.be/inpok4MKVLM 🧘‍♀️",
    };

    return suggestions[selectedLevel];
  };

  return (

    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={HomeStyle.scrollContainer}
    >


      {/* sleep card */}
      <Pressable
        style={({ pressed }) => [
          HomeStyle.rectangle,
          {
            transform: [{ scale: pressed ? 1 : 0.95 }],
            backgroundColor: pressed ? '#FFF1D6' : 'white',
            elevation: pressed ? 5 : 3,
          },
        ]}
        onPress={() => setmodalSleep(true)}
      >
        <View style={{ flexDirection: 'row', }}>
          <Text style={HomeStyle.Card_title}>sleep</Text>
          <FontAwesome5 name='moon' size={25} color="#E6A72F" style={HomeStyle.Card_icon} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SleepTracker sleepmodaldata={sleepmodaldata} />

        </View>
      </Pressable>
      <SleepWakeTimeModal
        visible={modalSleep}
        onClose={() => setmodalSleep(false)}
        onSubmit={handleModalSubmit}
      />


      {/* stress level card */}
      <Pressable
        onPress={() => setModalOpen(!modalOpen)}
        style={({ pressed }) => [
          HomeStyle.rectangle,
          {
            transform: [{ scale: pressed ? 1 : 0.95 }],
            backgroundColor: pressed ? '#d6f0fa' : 'white',
            elevation: pressed ? 5 : 3,
          },
        ]}
      >

        <View style={{ flexDirection: 'row', }}>
          <Text style={{
            marginLeft: 13,
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10
          }}>Stress Guide</Text>
          <FontAwesome5 name="spa" size={18} color="#0d6e9c" style={HomeStyle.Card_icon} />
        </View>
        {selectedLevel !== null && (
          <Text style={{
            marginLeft: 13,
            marginTop: 5,
            fontSize: 15,
            color: 'grey'
          }}>
            {getSuggestion()}
          </Text>
        )}
        {selectedLevel === null && (
          <LottieView
            source={require('../img/stresslotie')}
            autoPlay
            loop
            style={{
              width: 150, height: 150, alignItems: 'center',
              justifyContent: 'center',marginTop:7
            }}
          />

        )}
        <Modal
          visible={modalOpen}
          animationType='fade'
          transparent={true}

        >
          <View style={HomeStyle.container}>
            <View style={HomeStyle.innercontainer}>
              <Text style={HomeStyle.heading}>How stressed are you feeling?</Text>
              <View style={HomeStyle.emojiContainer}>
                {stressLevels.map((level, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      HomeStyle.emojiButton,
                      selectedLevel === index && HomeStyle.selectedEmoji
                    ]}
                    onPress={() => setSelectedLevel(index)}
                  >
                    <Text style={HomeStyle.emoji}>{level.emoji}</Text>
                    <Text>{level.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Button title="Submit" onPress={submitStress} />
            </View>
          </View>
        </Modal>
      </Pressable>

      {/* medicine intake card */}
 <Pressable
     
        style={({ pressed }) => [
             HomeStyle.rectangle,
          {
            backgroundColor: pressed ? '#d6f0fa' : 'white',
            transform: [{ scale: pressed ? 1 : 0.95 }],
            elevation: pressed ? 5 : 3,
         },
        ]}
      >
           <View style={{ flexDirection: 'row', }}>
          <Text style={{
            marginLeft: 13,
            fontSize: 14,
            fontWeight: 'bold',
            marginTop: 10
          }}>Medication</Text>
          <FontAwesome5 name="spa" size={18} color="#0d6e9c" style={HomeStyle.Card_icon} />
        </View>
        <LottieView
          source={require('../img/sleeplotie.json')} // Replace with your actual lottie
          autoPlay
          loop
           style={{
              width: 150, height: 150, alignItems: 'center',
              justifyContent: 'center',marginTop:7
            }}
        />
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  innercontainer: {
    backgroundColor: 'white', // your modal content background
    padding: 20,
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    marginBottom: 30,
    textAlign: 'center'
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20
  },
  emojiButton: {
    alignItems: 'center',
    padding: 10
  },
  selectedEmoji: {
    backgroundColor: '#E0F7FA',
    borderRadius: 10
  },
  emoji: { fontSize: 30 }
})

