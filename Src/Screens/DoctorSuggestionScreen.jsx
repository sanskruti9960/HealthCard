import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import LottieView from 'lottie-react-native';

const DoctorSuggestionScreen = () => {
  const [searchText, setSearchText] = useState('');

  const doctors = [
    { id: 1, name: 'Dr. Aditi Mehra' },
    { id: 2, name: 'Dr. Rahul Verma' },
    { id: 3, name: 'Dr. Sneha Patil' },
    { id: 4, name: 'Dr. Ankit Sharma' },
  ];
  const doctorCategories = [
    { id: '1', title: 'Cardiologist' },
    { id: '2', title: 'Dentist' },
    { id: '3', title: 'Neurologist' },
    { id: '4', title: 'Dermatologist' },
    { id: '5', title: 'Pediatrician' },
  ];


  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={style.Screen} contentContainerStyle={{ flexGrow: 1 }}>
      <View style={style.Screen}>
        <View style={style.heading}>
          <Text style={style.greetingText}>Hello Sarthak,</Text>
          <Text style={style.greetingText}>Pick your Doctor</Text>
        </View>

        <View style={style.searchWrapper}>
          <TouchableOpacity>
            <Feather style={style.searchIcon}
              name={"search"}
              size={16}
              color="#888" />
          </TouchableOpacity>
          <TextInput
            placeholder="Search for doctor"
            placeholderTextColor="#888"
            style={style.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={style.divider} />

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.scrollRow}>
          <TouchableOpacity style={style.CategorieCard}>
            {/* <Image source={require('../Images/brain.png')} style={style.CategorieIcon} /> */}
            <Text style={style.docLabel}>Neurologist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.CategorieCard}>
            {/* <Image source={require('../Images/Heart.png')} style={style.docIcon} /> */}
            <Text style={style.CategorieLabel}>Cardiologist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.CategorieCard}>
            {/* <Image source={require('../Images/knee.png')} style={style.docIcon} /> */}
            <Text style={style.CategorieLabel}>Orthopedist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.CategorieCard}>
            {/* <Image source={require('../Images/brain.png')} style={style.CategorieIcon} /> */}
            <Text style={style.docLabel}>Neurologist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.CategorieCard}>
            {/* <Image source={require('../Images/Heart.png')} style={style.docIcon} /> */}
            <Text style={style.CategorieLabel}>Cardiologist</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.CategorieCard}>
            {/* <Image source={require('../Images/knee.png')} style={style.docIcon} /> */}
            <Text style={style.CategorieLabel}>Orthopedist</Text>
          </TouchableOpacity>

        </ScrollView>

        <View style={style.DoctorCard}>
        </View>



        {/* <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={style.doctorItem}>
            <Text style={style.doctorName}>{item.name}</Text>
          </View>
        )}
      /> */}
      </View>
    </ScrollView>
  );
};

export default DoctorSuggestionScreen;

const style = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  heading: {
    marginTop: 40,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
  },
  greetingText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#333',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginHorizontal: 20,
    elevation: 5,
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 20,
    marginHorizontal: 20,
  },
  scrollRow: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
  },

  CategorieCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    marginRight: 15,
    elevation: 3,
    // shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 2,
    shadowRadius: 1.41,
  },

  CategorieIcon: {
    width: 35,
    height: 35,
    marginBottom: 6,
    resizeMode: 'contain',
  },

  CategorieLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },

  // categoryItem: {
  //   backgroundColor: '#e1ecf4',
  //   paddingVertical: 15,
  //   // paddingHorizontal: 16,
  //   borderRadius: 20,
  //   marginRight: 12,
  //   elevation: 2,
  // },
  // categoryText: {
  //   fontSize: 14,
  //   fontWeight: '500',
  //   color: '#1b47d2',
  // },
  
  DoctorCard: {
  backgroundColor: 'purple',
  // padding: 16,
  // marginBottom: 15,
  borderRadius: 15,
  // elevation: 3,
  // shadowColor: '#000',
  // shadowOffset: { width: 0, height: 1 },
  // shadowOpacity: 0.1,
  // shadowRadius: 1.41,
  },
});