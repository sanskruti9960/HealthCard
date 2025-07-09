import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LottieView from 'lottie-react-native';

export default function MedicationCard() {
  const [modalVisible, setModalVisible] = useState(false);
  const [medications, setMedications] = useState([]);

  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');

  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    const newMed = {
      id: Date.now().toString(),
      name,
      dosage,
      time,
    };
    setMedications((prev) => [...prev, newMed]);
    setShowForm(false);
    setName('');
    setDosage('');
    setTime('');
  };

  return (
    <View>
      {/* Medication Card */}
      <Pressable
        onPress={() => setModalVisible(true)}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#d6f0fa' : 'white',
            padding: 5,
            width: 150,
            height: 180,
            borderRadius: 20,
            marginRight: 12,
            transform: [{ scale: pressed ? 1 : 0.95 }],
            elevation: pressed ? 5 : 3,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}
      >
        <LottieView
          source={require('../img/sleeplotie.json')} // Replace with your actual lottie
          autoPlay
          loop
          style={{ width: 100, height: 100 }}
        />
        <Text style={{ marginTop: 8, fontSize: 16 }}>Medication</Text>
      </Pressable>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.title}>Your Medications</Text>

          {/* Show List */}
          {medications.length === 0 ? (
            <Text style={{ textAlign: 'center', marginBottom: 16 }}>No medications yet.</Text>
          ) : (
            medications.map((med) => (
              <View key={med.id} style={styles.medCard}>
                <Text>🧪 {med.name}</Text>
                <Text>💊 {med.dosage}</Text>
                <Text>⏰ {med.time}</Text>
              </View>
            ))
          )}

          {/* Add New Button */}
          {!showForm && (
            <Pressable onPress={() => setShowForm(true)} style={styles.addButton}>
              <Text style={{ fontSize: 18 }}>➕ Add New Medication</Text>
            </Pressable>
          )}

          {/* Medication Form */}
          {showForm && (
            <View style={{ marginTop: 20, width: '100%' }}>
              <TextInput
                placeholder="Medicine Name"
                  placeholderTextColor="#888" 
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                placeholder="Dosage (e.g., 1 tablet)"
                  placeholderTextColor="#888" 
                value={dosage}
                onChangeText={setDosage}
                style={styles.input}
              />
              <TextInput
                placeholder="Time (e.g., 08:00)"
                  placeholderTextColor="#888" 
                value={time}
                onChangeText={setTime}
                style={styles.input}
              />

              <Button title="Add Medication" onPress={handleAdd} />
              <View style={{ marginTop: 10 }} />
              <Button title="Cancel" color="gray" onPress={() => setShowForm(false)} />
            </View>
          )}

          {/* Close Modal */}
          <View style={{ marginTop: 30 }}>
            <Button title="Close" color="#cc0000" onPress={() => setModalVisible(false)} />
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    marginBottom: 12,
    width: '100%',
  },
  medCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: '#d0ebff',
    padding: 12,
    borderRadius: 8,
  },
});
