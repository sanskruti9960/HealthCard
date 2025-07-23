import React, { useState } from 'react';
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Modal, Linking, TextInput
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { collection, addDoc, getDocs, } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { useEffect } from 'react';

const saveContactToFirebase = async (userId, contact) => {
  try {
    // Firestore collection path
    const docRef = await addDoc(collection(db, `users/${userId}/emergencyContacts`), contact);
    console.log("Contact saved to Firestore with ID:", docRef.id);
  } catch (error) {
    console.error("Error saving contact:", error);
  }
};

const Emergencycontact = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('');


   useEffect(() => {
    fetchContactsFromFirebase("user123"); // Replace with real user ID later
  }, []);

  // 🔄 Dynamic Contact List
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);
  };

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
    setModalVisible(false);
  };

  const fetchContactsFromFirebase = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, `users/${userId}/emergencyContacts`));
      const contacts = [];
      querySnapshot.forEach((doc) => {
        contacts.push({
          id: doc.id, // Firestore document ID
          ...doc.data(), // name, phone, relation
        });
      });
      setEmergencyContacts(contacts); // ⬅️ Update state
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  return (
    <View style={style.Screen}>
      {/* Header */}
      <View style={style.Header}>
        <TouchableOpacity style={style.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={style.contactstext}>Contacts</Text>
      </View>

      {/* Contact List */}
      <View style={style.contactsList}>
        <FlatList
          data={emergencyContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={style.contactRow}
              onPress={() => openContactModal(item)}
            >
              <FontAwesome
                name="user-circle"
                size={35}
                color="grey"
                style={style.contactavatar}
              />
              <View style={style.contactDetails}>
                <Text style={style.contactName}>{item.name}</Text>
                <Text style={style.cardValue}>{item.phone}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* View Contact Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
      >
        <View style={style.modalBackground}>
          <View style={style.modalCard}>
            <Text style={style.modalTitle}>{selectedContact?.name}</Text>
            <Text style={style.modalSub}>{selectedContact?.relation}</Text>
            <Text style={style.modalPhone}>{selectedContact?.phone}</Text>

            <View style={style.modalButtons}>
              <TouchableOpacity
                style={[style.modalBtn, { backgroundColor: '#1b47d2' }]}
                onPress={() => handleCall(selectedContact?.phone)}
              >
                <MaterialIcons name="call" size={20} color="#fff" />
                <Text style={style.modalBtnText}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.modalBtn, { backgroundColor: '#555' }]}
                onPress={() => setModalVisible(false)}
              >
                <MaterialIcons name="edit" size={20} color="#fff" />
                <Text style={style.modalBtnText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={style.modalCancel}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ➕ Floating Add Button */}
      <TouchableOpacity
        style={style.fab}
        onPress={() => setAddModalVisible(true)}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Add Contact Modal */}
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
      >
        <View style={style.modalBackground}>
          <View style={style.modalCard}>
            <Text style={style.modalTitle}>Add New Contact</Text>

            <TextInput
              placeholder="Name"
              style={style.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Phone"
              style={style.input}
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <TextInput
              placeholder="Relation"
              style={style.input}
              value={newRelation}
              onChangeText={setNewRelation}
            />

            <View style={[style.modalButtons, { marginTop: 16 }]}>
              <TouchableOpacity
                style={[style.modalBtn, { backgroundColor: '#1b47d2' }]}
                onPress={() => {
                  if (newName && newPhone) {
                    const newContact = {
                      id: Date.now().toString(),
                      name: newName,
                      phone: newPhone,
                      relation: newRelation || 'Unknown',
                    };

                    // 1️⃣ Add to local list
                    setEmergencyContacts(prev => [...prev, newContact]);

                    // 2️⃣ Save to Firebase (replace 'user123' with your real user ID from auth later)
                    saveContactToFirebase("user123", newContact);

                    // 3️⃣ Reset form & close modal
                    setAddModalVisible(false);
                    setNewName('');
                    setNewPhone('');
                    setNewRelation('');
                  } else {
                    alert('Name and phone are required');
                  }
                }}

              >
                <Ionicons name="save" size={20} color="#fff" />
                <Text style={style.modalBtnText}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[style.modalBtn, { backgroundColor: '#555' }]}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={style.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Emergencycontact;


const style = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  contactstext: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: '50%',
  },
  contactsList: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 2,
    marginBottom: 8,
  },
  contactavatar: {
    marginRight: 16,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  cardValue: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },

  // MODAL STYLES
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  modalCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  modalSub: {
    fontSize: 16,
    color: '#444',
    marginTop: 4,
  },
  modalPhone: {
    fontSize: 16,
    color: '#1b47d2',
    marginTop: 8,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 20,
  },
  modalBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalBtnText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
  modalCancel: {
    marginTop: 20,
    color: 'red',
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#1b47d2',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
});
