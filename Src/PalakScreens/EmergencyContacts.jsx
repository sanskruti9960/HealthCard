import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  Linking,
  Modal,
} from "react-native";
import { Avatar, Card, FAB } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import FirestoreService from "../Services/FirestoreService";
import ContactModal from "./ContactModal";

const EmergencyContacts = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showTip, setShowTip] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await FirestoreService.getEmergencyContacts();
      setContacts(data);
    } catch (error) {
      console.log("Error loading contacts:", error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const handlePrevious = () => navigation.goBack();

  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`);
    setDetailModalVisible(false);
  };

  const addContact = () => {
    setIsEditing(false);
    setModalVisible(true);
  };

  const handleEdit = () => {
    if (!selectedContact) return;
    setIsEditing(true);
    setModalVisible(true);
    setDetailModalVisible(false);
  };

  const handleDelete = async () => {
    if (!selectedContact) return;
    try {
      await FirestoreService.deleteEmergencyContact(selectedContact.id);
      setDetailModalVisible(false);
      loadData();
      setSelectedContact(null);
    } catch (error) {
      console.log("Error deleting:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.viewStyle}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={handlePrevious}>
            <Icon name="arrow-back" size={24} color="#2E3A59" />
          </TouchableOpacity>
          <Text style={styles.mainHeading}>Emergency Contacts</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.heroContainer}>
          <Avatar.Icon size={80} icon="contacts" style={styles.avatar} />
          <Text style={styles.heroTitle}>Emergency Contacts</Text>
          <Text style={styles.heroSubtitle}>
            Add your emergency contact information for safety
          </Text>


        </View>

        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {contacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              onPress={() => {
                setSelectedContact(contact);
                setDetailModalVisible(true);
              }}
            >
              <Card style={styles.contactCard}>
                <Card.Content>
                  <View style={styles.contactHeader}>
                    <Icon name="person" size={22} color="#1C75BC" />
                    <Text style={styles.contactName}>{contact.emergencyName}</Text>
                  </View>
                  <View style={styles.contactDetails}>
                    <View style={styles.contactRow}>
                      <Icon name="phone" size={18} color="#6B7280" />
                      <Text style={styles.contactInfo}>{contact.emergencyPhone}</Text>
                    </View>
                    {contact.emergencyRelation && (
                      <View style={styles.contactRow}>
                        <Icon name="family-restroom" size={18} color="#6B7280" />
                        <Text style={styles.contactInfo}>{contact.emergencyRelation}</Text>
                      </View>
                    )}
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>

 {/* Floating Tip */}
      {showTip && (
        <View style={styles.tipContainer}>
          <Text style={styles.tipText}>Add contacts form here</Text>
          <TouchableOpacity onPress={() => setShowTip(false)}>
            <Text style={styles.dismissText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

        <FAB style={styles.fab} icon="plus" color="white" onPress={addContact} />

        <ContactModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onRefresh={loadData}
          isEditing={isEditing}
          selectedContact={isEditing ? selectedContact : null}
          setSelectedContact={setSelectedContact}
        />

        {/* Detail modal*/}
        <Modal visible={detailModalVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setDetailModalVisible(false)}
            activeOpacity={1}
          >
            <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
              <Card style={styles.modalCard}>
                <Card.Content>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setDetailModalVisible(false)}
                  >
                    <Icon name="close" size={20} color="#374151" />
                  </TouchableOpacity>

                  <Text style={styles.modalTitle}>Contact Details</Text>

                  {selectedContact && (
                    <>
                      <View style={styles.detailRow}>
                        <Icon name="person" size={20} />
                        <Text style={styles.detailLabel}>Name:</Text>
                        <Text style={styles.detailValue}>{selectedContact.emergencyName}</Text>
                      </View>
                      <View style={styles.detailRow}>
                        <Icon name="phone" size={20} />
                        <Text style={styles.detailLabel}>Phone:</Text>
                        <Text style={styles.detailValue}>{selectedContact.emergencyPhone}</Text>
                      </View>
                      {selectedContact.emergencyRelation && (
                        <View style={styles.detailRow}>
                          <Icon name="family-restroom" size={20} />
                          <Text style={styles.detailLabel}>Relation:</Text>
                          <Text style={styles.detailValue}>{selectedContact.emergencyRelation}</Text>
                        </View>
                      )}

                      <View style={styles.detailButtonContainer}>
                        <TouchableOpacity
                          style={styles.callButton}
                          onPress={() => handleCall(selectedContact.emergencyPhone)}
                        >
                          <Icon name="phone" color="#FFF" size={18} />
                          <Text style={styles.callButtonText}>Call</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                          <Icon name="edit" size={18} color="#1C75BC" />
                          <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                          <Icon name="delete" size={16} color="#FFF" />
                          <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                </Card.Content>
              </Card>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EmergencyContacts;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backBtn: {
    padding: 8,
  },
  mainHeading: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
  },
  heroContainer: {
     alignItems: 'center',
      paddingVertical: 20 
    },
  avatar: {
     backgroundColor: '#1C75BC' 
    },
  heroTitle: { 
    fontSize: 24,
     fontWeight: '700', 
     color: '#1E293B' 
    },
  heroSubtitle: { 
    fontSize: 13, 
    color: '#64748B', 
    marginTop: 4 
  },
  scrollContainer: { 
    paddingHorizontal: 20,
     paddingTop: 20
     },
  contactCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactName: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '500',
    color: '#3a3c41ff',
  },
  contactDetails: {
    marginLeft: 36,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    
  },
  contactInfo: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6B7280',
  },
  fab: {
    position: 'absolute',
    right: 14,
    bottom: 30,
    backgroundColor: '#1C75BC',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    borderRadius: 16,
    backgroundColor: '#FFF',
    paddingVertical: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 99,
    padding: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 20,
    color: '#3a3c41ff',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  detailLabel: {
    marginLeft: 12,
    fontWeight: '500',
    color: '#3a3c41ff',
  },
  detailValue: {
    marginLeft: 8,
    color: '#374151',
    
  },
  detailButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginTop: 10,
    gap: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#10B981',
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    color: '#FFF',
    marginLeft: 6,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#1C75BC',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#1C75BC',
    marginLeft: 6,
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#EF4444',
    borderRadius: 10,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFF',
    marginLeft: 6,
  },
  tipContainer: {
    position: 'absolute',
    bottom: 90, // above the FAB
    right: 20,
    backgroundColor: '#1C75BC',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  tipText: {
    color: '#FFF',
    fontSize: 14,
    marginRight: 8,
  },
  dismissText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
