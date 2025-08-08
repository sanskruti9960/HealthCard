import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList,
  TouchableOpacity, Modal, Linking, TextInput, ActivityIndicator, Alert
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import auth from '@react-native-firebase/auth'; // ✅ Android Firebase Auth

const saveContactToFirebase = async (userId, contact, setLoading) => {
  try {
    setLoading(true);
    const docRef = await addDoc(collection(db, `Siddhi/${userId}/emergencyContacts`), contact);
    console.log("Contact saved to Firestore with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error saving contact:", error);
  } finally {
    setLoading(false);
  }
};


const deleteContactFromFirebase = async (userId, contactId) => {
  try {
    const contactDocRef = doc(db, `Siddhi/${userId}/emergencyContacts/${contactId}`);
    await deleteDoc(contactDocRef);
    console.log("Deleted successfully");
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
};

const Emergencycontact = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRelation, setNewRelation] = useState('');
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [relationError, setRelationError] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  const userId = "aPfMrCGlhhXDMyZWqJ0plGMflLg1"; // ✅ Authenticated user ID
  // const userId = auth().currentUser?.uid;

  useEffect(() => {
    if (userId) {
      fetchContactsFromFirebase(userId);
    }
  }, [userId]);

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
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, `Siddhi/${userId}/emergencyContacts`));
      const contacts = [];
      querySnapshot.forEach((doc) => {
        contacts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setEmergencyContacts(contacts);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <View style={style.Screen}>
      <View style={style.Header}>
        <TouchableOpacity style={style.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={style.contactstext}>Contacts</Text>
      </View>

      <View style={style.contactsList}>
        {loading ? (
          <ActivityIndicator size="large" color="#1b47d2" />
        ) : (
          <FlatList
            data={emergencyContacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={style.contactRow} onPress={() => openContactModal(item)}>
                <View style={style.verticalStrip} /> {/* Blue strip */}

                <FontAwesome name="user-circle" size={30} color="grey" style={style.contactavatar} />

                <View style={style.contactDetails}>
                  <Text style={style.contactName}>{item.name}</Text>
                  <Text style={style.cardValue}>{item.relation}</Text>
                  <Text style={style.cardValue}>{item.phone}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={style.modalBackground}>
          <View style={style.modalCard}>

            {/* Optional Image Preview */}
            {selectedContact?.snap && (
              <Image
                source={{ uri: selectedContact.snap }}
                style={style.modalSnap}
              />
            )}

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
                style={[style.modalBtn, { backgroundColor: 'red' }]}
                onPress={async () => {
                  if (!userId) return;
                  try {
                    await deleteContactFromFirebase(userId, selectedContact?.id);
                    await fetchContactsFromFirebase(userId);
                    setModalVisible(false);
                  } catch (error) {
                    console.error("Delete failed:", error);
                    Alert.alert("Error", "Contact could not be deleted.");
                  }
                }}
              >
                <MaterialIcons name="delete" size={20} color="#fff" />
                <Text style={style.modalBtnText}>Delete</Text>
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


      {/* Floating Action Button */}
      <TouchableOpacity style={style.fab} onPress={() => setAddModalVisible(true)}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Add Contact Modal */}
      <Modal visible={addModalVisible} transparent animationType="slide">
        <View style={style.modalBackground}>
          <View style={style.modalCard}>
            <Text style={style.modalTitle}>Add New Contact</Text>

            <TextInput
              style={[style.input, nameError && style.errorInput]}
              placeholder="Enter name"
              value={newName}
              onChangeText={(text) => {
                setNewName(text);
                if (text.trim()) setNameError('');
              }}
            />
            {nameError ? <Text style={style.errorText}>{nameError}</Text> : null}

            <TextInput
              style={[style.input, phoneError && style.errorInput]}
              placeholder="Enter phone number"
              keyboardType="numeric"
              value={newPhone}
              onChangeText={(text) => {
                setNewPhone(text);
                if (text.trim()) setPhoneError('');
              }}
            />
            {phoneError ? <Text style={style.errorText}>{phoneError}</Text> : null}

            <TextInput
              style={[style.input, relationError && style.errorInput]}
              placeholder="Enter relation"
              value={newRelation}
              onChangeText={(text) => {
                setNewRelation(text);
                if (text.trim()) setRelationError('');
              }}
            />
            {relationError ? <Text style={style.errorText}>{relationError}</Text> : null}

            <View style={[style.modalButtons, { marginTop: 16 }]}>
              <TouchableOpacity
                style={[style.modalBtn, { backgroundColor: '#1b47d2' }]}
                onPress={async () => {
                  let isValid = true;
                  const phoneRegex = /^[0-9]{10}$/;

                  if (!newName.trim()) {
                    setNameError('Name is required');
                    isValid = false;
                  } else setNameError('');

                  if (!newPhone.trim()) {
                    setPhoneError('Phone number is required');
                    isValid = false;
                  } else if (!phoneRegex.test(newPhone)) {
                    setPhoneError('Enter a valid 10-digit phone number');
                    isValid = false;
                  } else setPhoneError('');

                  if (!newRelation.trim()) {
                    setRelationError('Relation is required');
                    isValid = false;
                  } else setRelationError('');

                  if (!isValid || !userId) return;

                  const newContact = {
                    name: newName.trim(),
                    phone: newPhone.trim(),
                    relation: newRelation.trim(),
                  };

                  await saveContactToFirebase(userId, newContact, setLoading);
                  await fetchContactsFromFirebase(userId);

                  setAddModalVisible(false);
                  setNewName('');
                  setNewPhone('');
                  setNewRelation('');
                  setNameError('');
                  setPhoneError('');
                  setRelationError('');
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
    paddingHorizontal: 8,
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  modalSnap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
    resizeMode: 'cover',
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
  },

  modalSub: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginTop: 4,
  },

  modalPhone: {
    fontSize: 16,
    textAlign: 'center',
    color: '#1b47d2',
    marginTop: 6,
    marginBottom: 16,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  modalBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 6,
    borderRadius: 10,
  },

  modalBtnText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14,
  },

  modalCancel: {
    color: 'red',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
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
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 4,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 4,
  },
  verticalStrip: {
  width: 5,
  height: '80%',
  backgroundColor: '#007BFF', // Blue color
  borderRadius: 2,
  marginRight: 10,
  alignSelf: 'center',
},

contactRow: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
  marginVertical: 6,
  elevation: 3, // subtle shadow for Android
  shadowColor: '#000', // iOS shadow
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
},

contactavatar: {
  marginRight: 10,
},

contactDetails: {
  flex: 1,
},

contactName: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
},

cardValue: {
  fontSize: 14,
  color: '#555',
},

});

