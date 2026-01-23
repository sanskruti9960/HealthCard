import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Keyboard, StyleSheet, Modal } from "react-native";
import { Card, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import FirestoreService from "../Services/firestoreSrevice";

const ContactModal = ({
  visible,
  onClose,
  onRefresh,
  isEditing,
  selectedContact,
  setSelectedContact,
}) => {
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [emergencyRelation, setEmergencyRelation] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    if (isEditing && selectedContact) {
      setEmergencyName(selectedContact.emergencyName);
      setEmergencyPhone(selectedContact.emergencyPhone);
      setEmergencyRelation(selectedContact.emergencyRelation || "");
    } else {
      resetFields();
    }
  }, [visible]);

  const resetFields = () => {
    setEmergencyName("");
    setEmergencyPhone("");
    setEmergencyRelation("");
    setNameError("");
    setPhoneError("");
  };

  const validate = () => {
    let valid = true;
    if (!emergencyName.trim()) {
      setNameError("Contact name is required");
      valid = false;
    } else {
      setNameError("");
    }

    if (!/^[0-9]{10}$/.test(emergencyPhone)) {
      setPhoneError("Enter a valid 10-digit number");
      valid = false;
    } else {
      setPhoneError("");
    }

    return valid;
  };

  const handleSaveContact = async () => {
    if (!validate()) return;

    const data = {
      emergencyName,
      emergencyPhone,
       emergencyRelation: emergencyRelation || "",
    };

    try {
      if (isEditing && selectedContact) {
        await FirestoreService.saveEmergencyContact({
          ...data,
          id: selectedContact.id,
          createdAt: selectedContact.createdAt,
        });
        setSelectedContact(null);
      } else {
        await FirestoreService.saveEmergencyContact(data);
      }
      onRefresh();
      onClose();
      resetFields();
    } catch (error) {
      console.log("Error saving contact:", error);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={() => {
          resetFields();
          onClose();
        }}
      >
        <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
          <Card style={styles.modalCard}>
            <Card.Content>
              <TouchableOpacity style={styles.closeButton} onPress={() => {
                resetFields();
                onClose();
              }}>
                <Icon name="close" size={20} color="#374151" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>
                {isEditing ? "Edit Contact" : "Add Emergency Contact"}
              </Text>

              <View style={styles.modalInputContainer}>
                <TextInput
                  label="Contact Name"
                  value={emergencyName}
                  mode="outlined"
                  onChangeText={setEmergencyName}
                  placeholder="Enter full name"
                  left={<TextInput.Icon icon="account" />}
                  error={!!nameError}
                />
                {nameError ? <Text style={styles.modalError}>{nameError}</Text> : null}
              </View>

              <View style={styles.modalInputContainer}>
                <TextInput
                  label="Phone Number"
                  value={emergencyPhone}
                  mode="outlined"
                  onChangeText={setEmergencyPhone}
                  placeholder="Enter phone number"
                  keyboardType="number-pad"
                  maxLength={10}
                  left={<TextInput.Icon icon="phone" />}
                  error={!!phoneError}
                />
                {phoneError ? <Text style={styles.modalError}>{phoneError}</Text> : null}
              </View>

              <View style={styles.modalInputContainer}>
                <TextInput
                  label="Relationship (Optional)"
                  value={emergencyRelation}
                  mode="outlined"
                  onChangeText={setEmergencyRelation}
                  placeholder="e.g., Spouse, Parent"
                  left={<TextInput.Icon icon="account-group" />}
                />
              </View>

              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={handleSaveContact}>
                  <Icon name={isEditing ? "save" : "add"} size={20} color="#FFF" />
                  <Text style={styles.modalButtonText}>
                    {isEditing ? "Save Changes" : "Add Contact"}
                  </Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default ContactModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    borderRadius: 16,
    backgroundColor: "#FFF",
    paddingVertical: 8,
    
  },
  closeButton: {
    position: "absolute",
    top: 14,
    right: 14,
    zIndex: 99,
    padding: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
  },
  modalTitle: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 18,
    marginBottom: 20,
     color: '#3a3c41ff',
  },
  modalInputContainer: { marginBottom: 16, paddingHorizontal: 16 },
  modalButtonContainer: { paddingHorizontal: 16, marginTop: 10 },
  modalButton: {
    flexDirection: "row",
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1C75BC",
    borderRadius: 12,
  },
  modalButtonText: { color: "#FFF", fontSize: 16, marginLeft: 8 },
  modalError: { color: "#EF4444", marginTop: 4, paddingHorizontal: 4 },
});