import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

import FirestoreService, { USER_DATA_TYPES } from "../Services/FirestoreService";

const MedicalInfo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditable] = useState(true);

  const [medicalConditions, setMedicalConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [pastSurgery, setPastSurgery] = useState("");
  const [chronicIllnesses, setChronicIllnesses] = useState("");
  const [familyMedicalHistory, setFamilyMedicalHistory] = useState("");

  // ERROR STATES
  const [medicalConditionsError, setMedicalConditionsError] = useState("");
  const [allergiesError, setAllergiesError] = useState("");
  const [familyMedicalHistoryError, setFamilyMedicalHistoryError] = useState("");

  // Refs for focus
  const medicalConditionsRef = useRef(null);
  const allergiesRef = useRef(null);
  const familyMedicalHistoryRef = useRef(null);

 
  // Load Existing Medical Data
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await FirestoreService.getUserDataByType(
          USER_DATA_TYPES.MEDICAL
        );

        if (userData) {
          setMedicalConditions(userData.medicalConditions || "");
          setAllergies(userData.allergies || "");
          setPastSurgery(userData.pastSurgery || "");
          setChronicIllnesses(userData.chronicIllnesses || "");
          setFamilyMedicalHistory(userData.familyMedicalHistory || "");
        }
      } catch (err) {
        console.log("Error loading medical info:", err);
      }
    };

    loadData();
  }, []);


  //VALIDATION :
  
  const validateFields = () => {
    let isValid = true;

    if (!medicalConditions.trim()) {
      setMedicalConditionsError("Medical conditions field is required");
      isValid = false;
      medicalConditionsRef.current?.focus();
    }

    if (!allergies.trim()) {
      setAllergiesError("Allergies field is required");
      if (isValid) allergiesRef.current?.focus();
      isValid = false;
    }

    if (!familyMedicalHistory.trim()) {
      setFamilyMedicalHistoryError("Family medical history field is required");
      if (isValid) familyMedicalHistoryRef.current?.focus();
      isValid = false;
    }

    return isValid;
  };


  const clearError = (setter) => setter("");


  // SAVEING THE DATA
  const onSubmit = async () => {
    if (!validateFields()) return;

    const formState = {
      medicalConditions,
      allergies,
      pastSurgery,
      chronicIllnesses,
      familyMedicalHistory,
    };

    try {
      await FirestoreService.saveUserData(USER_DATA_TYPES.MEDICAL, formState);
      setModalVisible(true);

      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate("MedicalReportPreview", { formState });
      }, 1800);
    } catch (err) {
      console.log("Error saving medical info:", err);
    }
  };

  const goBack = () => navigation.goBack();

 
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidStyle}
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />

      <View style={styles.viewStyle}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={goBack}>
            <Icon name="arrow-back" size={24} color="#2E3A59" />
          </TouchableOpacity>
          <Text style={styles.mainHeading}>Medical Information</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Hero */}
        <View style={styles.heroContainer}>
          <View style={styles.iconWrapper}>
            <Avatar.Icon
              size={80}
              icon="medical-bag"
              color="#FFF"
              style={styles.avatar}
            />
          </View>
          <Text style={styles.heroTitle}>Your Health Profile</Text>
          <Text style={styles.heroSubtitle}>
            Complete your medical information for better care
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <Text style={styles.HeaderStyle}>MEDICAL CONDITIONS :</Text>

          {/* Medical Conditions */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={medicalConditionsRef}
              label="Existing Medical Condition(If Any/None)"
              value={medicalConditions}
              mode="outlined"
              disabled={!isEditable}
              onChangeText={(t) => {
                setMedicalConditions(t);
                clearError(setMedicalConditionsError);
              }}
              placeholder="e.g. Asthma, Diabetes / None"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="local-hospital" size={20} color="#1C75BC" />}
                />
              }
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{
                roundness: 12,
                colors: { primary: "#1C75BC", background: "white" },
              }}
            />
            {medicalConditionsError !== "" && (
              <Text style={styles.errorText}>{medicalConditionsError}</Text>
            )}
          </View>

          {/* Allergies */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={allergiesRef}
              label="Allergies(If Any/None)"
              value={allergies}
              mode="outlined"
              disabled={!isEditable}
              onChangeText={(t) => {
                setAllergies(t);
                clearError(setAllergiesError);
              }}
              placeholder="e.g. Pollen, Milk, Dust"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="warning" size={20} color="#1C75BC" />}
                />
              }
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{
                roundness: 12,
                colors: { primary: "#1C75BC", background: "white" },
              }}
            />
            {allergiesError !== "" && (
              <Text style={styles.errorText}>{allergiesError}</Text>
            )}
          </View>

          {/* Past Surgery */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Past Surgeries"
              value={pastSurgery}
              mode="outlined"
              disabled={!isEditable}
              onChangeText={(t) => setPastSurgery(t)}
              placeholder="If any"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="healing" size={20} color="#1C75BC" />}
                />
              }
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{
                roundness: 12,
                colors: { primary: "#1C75BC", background: "white" },
              }}
            />
          </View>

          {/* Chronic Illnesses */}
          <View style={styles.inputContainer}>
            <TextInput
              label="Chronic Illness"
              value={chronicIllnesses}
              mode="outlined"
              disabled={!isEditable}
              onChangeText={(t) => setChronicIllnesses(t)}
              placeholder="If any"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="favorite" size={20} color="#1C75BC" />}
                />
              }
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{
                roundness: 12,
                colors: { primary: "#1C75BC", background: "white" },
              }}
            />
          </View>

          {/* Family Medical History */}
          <View style={styles.inputContainer}>
            <TextInput
              ref={familyMedicalHistoryRef}
              label="Family Medical History (If Any)"
              value={familyMedicalHistory}
              mode="outlined"
              disabled={!isEditable}
              onChangeText={(t) => {
                setFamilyMedicalHistory(t);
                clearError(setFamilyMedicalHistoryError);
              }}
              placeholder="If any"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="family-restroom" size={20} color="#1C75BC" />}
                />
              }
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{
                roundness: 12,
                colors: { primary: "#1C75BC", background: "white" },
              }}
            />
            {familyMedicalHistoryError !== "" && (
              <Text style={styles.errorText}>{familyMedicalHistoryError}</Text>
            )}
          </View>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={onSubmit}>
              <Icon name="save" size={24} color="#1C75BC" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Saved Modal */}
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}> ✅ Data Saved Successfully </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MedicalInfo;

const styles = StyleSheet.create({
  keyboardAvoidStyle: {
    flex: 1
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  placeholder: {
    width: 40,
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  heroContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  iconWrapper: {
    backgroundColor: 'transparent',
    borderRadius: 35,
    padding: 8,
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: '#1C75BC',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  HeaderStyle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginBottom: 16,
  },
  paperInput: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginVertical: 30,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  buttonText: {
    color: '#1C75BC',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#1C75BC',
    fontWeight: '600',
    textAlign: 'center',
  },
  btnStyle: {
    padding: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
