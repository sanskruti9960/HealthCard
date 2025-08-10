import React, { useState, useEffect, useCallback } from "react";
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
import { Divider, Avatar, Card, TextInput, Button } from "react-native-paper";

import Icon from 'react-native-vector-icons/MaterialIcons'
import FirestoreService, { USER_DATA_TYPES } from "../Services/FirestoreService";

const MedicalInfo = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  
  const [formState, setFormState] = useState({
    medicalConditions: '',
    allergies: '',
    pastSurgery: '',
    chronicIllnesses: '',
    familyMedicalHistory: '',
  });

  useEffect(() => {
    loadExistingData();
  }, []);

  const loadExistingData = useCallback(async () => {
    try {
      const userData = await FirestoreService.getUserDataByType(USER_DATA_TYPES.MEDICAL);
      if (userData) {
        setFormState(userData);
        console.log('Loaded existing medical data');
      }
    } catch (error) {
      console.log('Error loading medical data:', error);
    }
  }, []);

  const handleChange = useCallback((field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSubmit = useCallback(async () => {
    try {
      await FirestoreService.saveUserData(USER_DATA_TYPES.MEDICAL, formState);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('MedicalReportPreview', { formState });
      }, 2000);
    } catch (error) {
      console.log('Error saving medical info:', error);
    }
  }, [formState, navigation]);


  return (
     <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidStyle}
    >
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      
      <View style={styles.viewStyle}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleGoBack}>
            <Icon name="arrow-back" size={24} color="#2E3A59" />
          </TouchableOpacity>
          <Text style={styles.mainHeading}>Medical Information</Text>
          <View style={styles.placeholder} />
        </View>
        
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
          <Text style={styles.heroSubtitle}>Complete your medical information for better care</Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content>
              <Text style={styles.HeaderStyle}>MEDICAL CONDITIONS</Text>
              <Divider style={styles.divider}/>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Existing Medical Condition"
                  value={formState.medicalConditions}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('medicalConditions', text)}
                  placeholder="e.g. Asthma, Diabetes / None"
                  left={<TextInput.Icon icon={() => <Icon name="local-hospital" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Allergies"
                  value={formState.allergies}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('allergies', text)}
                  placeholder="e.g. Pollen, Milk, Dust"
                  left={<TextInput.Icon icon={() => <Icon name="warning" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Past Surgeries"
                  value={formState.pastSurgery}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('pastSurgery', text)}
                  placeholder="If any"
                  left={<TextInput.Icon icon={() => <Icon name="healing" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Chronic Illness"
                  value={formState.chronicIllnesses}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('chronicIllnesses', text)}
                  placeholder="If any"
                  left={<TextInput.Icon icon={() => <Icon name="favorite" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Family Medical History"
                  value={formState.familyMedicalHistory}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('familyMedicalHistory', text)}
                  placeholder="If any"
                  left={<TextInput.Icon icon={() => <Icon name="family-restroom" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
                />
              </View>
            </Card.Content>
          </Card>


          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onSubmit}
              activeOpacity={0.8}
            >
             <Icon name="save" size={24} color="#1C75BC" />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}> ✅Data Saved Successfully </Text>
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
    marginBottom: 4,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionCard: {
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  HeaderStyle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  divider: {
    backgroundColor: '#E2E8F0',
    height: 2,
    marginBottom: 15,
    borderRadius: 1,
  },
  inputContainer: {
    marginBottom: 8,
    marginTop: 4,
    width: '100%',
  },
  paperInput: {
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 1,
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  buttonText: {
    color: '#1C75BC',
    fontWeight: '700',
    fontSize: 20,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  btnStyle: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
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
});
