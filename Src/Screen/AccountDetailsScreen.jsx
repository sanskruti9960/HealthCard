import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const PersonalDetails = () => {

  const userId = 'Rxz6OBT6aadCbfJcGXtbmM9UaKE3'; // Replace with dynamic ID if needed
  // const userId = auth().currentUser?.uid;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const [personalDetails, setPersonalDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        if (!userId) return;

        const docRef = doc(db, 'Siddhi', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();

          // Top-level fields
          setFullName(userData.fullName || '');
          setEmail(userData.email || '');
          setPhone(userData.phone || '');
          setPassword(userData.password || '');

          // Nested map: personalDetails
          if (userData.personalDetails) {
            setPersonalDetails({
              birthDate: userData.personalDetails.birthDate || '',
              bloodGrp: userData.personalDetails.bloodGrp || '',
              gender: userData.personalDetails.gender || '',
              gender: userData.personalDetails.gender || '',
              gender: userData.personalDetails.gender || '',

            });
          }
        } else {
          console.log('No such user!');
        }
      } catch (error) {
        console.error('Error getting user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color='#1b47d2' />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Personal Information</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{fullName}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Birth Date:</Text>
          <Text style={styles.value}>{personalDetails.birthDate}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Blood Group:</Text>
          <Text style={styles.value}>{personalDetails.bloodGrp}</Text>
        </View>
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>{personalDetails.gender}</Text>
        </View>
       
      </View>
    </ScrollView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1b47d2',
    textAlign: 'center',
  },
  fieldRow: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 18,
    color: '#000',
    fontWeight: '500',
    marginTop: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
