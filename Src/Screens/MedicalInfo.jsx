import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import { Divider } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styling from "../Screens/Styling";
import { useForm, Controller } from "react-hook-form";
import FirestoreService from '../Services/firestoreSrevice';

const MedicalInfo = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicalConditions: "",
      allergies: "",
      pastSurgery: "",
      chronicIllnesses: "",
      familyMedicalHistory: "",
    },
  });

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      const id = await FirestoreService.getUserId();
      setUserId(id);
      loadData(id);
    } catch (error) {
      console.log('Error initializing user:', error);
    }
  };

  const loadData = async (userIdParam = userId) => {
    if (!userIdParam) return;
    try {
      const userData = await FirestoreService.getUserDataByType(userIdParam, 'medicalInfo');
      if (userData) {
        const { id, userId: uid, dataType, createdAt, updatedAt, ...allData } = userData;
        // Filter only medical form fields
        const medicalFormData = {
          medicalConditions: allData.medicalConditions || '',
          allergies: allData.allergies || '',
          pastSurgery: allData.pastSurgery || '',
          chronicIllnesses: allData.chronicIllnesses || '',
          familyMedicalHistory: allData.familyMedicalHistory || ''
        };
        reset(medicalFormData);
        console.log('Loaded medical info from Firestore');
      } else {
        const savedData = await AsyncStorage.getItem('medicalInfo');
        if (savedData) {
          const data = JSON.parse(savedData);
          reset(data);
          console.log('Loaded medical info from AsyncStorage');
        }
      }
    } catch (error) {
      console.log('Error loading medical info:', error);
      try {
        const savedData = await AsyncStorage.getItem('medicalInfo');
        if (savedData) {
          const data = JSON.parse(savedData);
          reset(data);
        }
      } catch (fallbackError) {
        console.log('Fallback load also failed:', fallbackError);
      }
    }
  };

  const getAllFormData = async () => {
    try {
       const medicalInfo = await AsyncStorage.getItem('medicalInfo');
      
      return {
        medicalInfo: medicalInfo ? JSON.parse(medicalInfo) : {},
      };
    } catch (error) {
      console.log('Error getting all form data:', error);
      return {};
    }
  };

  const onSubmit = useCallback(async (data) => {
    try {
      await AsyncStorage.setItem('medicalInfo', JSON.stringify(data));
      
      const docId = await FirestoreService.saveUserData(userId, 'medicalInfo', data);
      
      console.log('Medical info saved to Firestore with ID:', docId);
      Keyboard.dismiss();
      navigation.navigate("StartInsuranceFile");
    } catch (error) {
      console.log('Error saving medical info:', error);
      navigation.navigate("StartInsuranceFile");
    }
  }, [navigation, userId]);

  const handlePrevious = useCallback(() => {
    navigation.navigate("EmergencyContact");
  }, [navigation]);

  const handleSkip = useCallback(async () => {
    try {
      const currentValues = control._formValues;
      await AsyncStorage.setItem('medicalInfo', JSON.stringify(currentValues));
      
      const docId = await FirestoreService.saveUserData(userId, 'medicalInfo', currentValues);
      
      console.log('Medical info (skipped) saved to Firestore with ID:', docId);
      Keyboard.dismiss();
      navigation.navigate("StartInsuranceFile");
    } catch (error) {
      console.log('Error saving medical info on skip:', error);
      navigation.navigate("StartInsuranceFile");
    }
  }, [navigation, control, userId]);

  return (
    <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
      <View style={styles.viewStyle}>
       
        <Text style={styles.heading}>Medical Information</Text>

        <Divider />
        <View style={styles.viewStyle}>
           <Styling />

          {/* Medical Conditions */}
          <Text style={styles.HeaderStyle}>Existing Medical Condition</Text>
          <Controller
            control={control}
            name="medicalConditions"
            rules={{ required: "Medical condition is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="e.g. Asthma, Diabetes / None"
                placeholderTextColor="grey"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.medicalConditions && (
            <Text style={styles.error}>
              {errors.medicalConditions.message}
            </Text>
          )}

          {/* Allergies */}
          <Text style={styles.HeaderStyle}>Allergies</Text>
          <Controller
            control={control}
            name="allergies"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="e.g. Pollen, Milk, Dust"
                placeholderTextColor="grey"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />

          {/* Past Surgery */}
         
          <Text style={styles.HeaderStyle}>Past Surgeries</Text>
          <Controller
            control={control}
            name="pastSurgery"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="If any"
                placeholderTextColor="grey"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />

           <Text style={styles.HeaderStyle}>Any Chronic Illness</Text>
          <Controller
            control={control}
            name="chronicIllnesses"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="If any"
                placeholderTextColor="grey"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />

          <Text style={styles.HeaderStyle}>Any Family Medical History</Text>
          <Controller
            control={control}
            name="familyMedicalHistory"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="If any"
                placeholderTextColor="grey"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
        </View>


        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={handlePrevious}
          >
            <Text style={styles.btnTextLeft}>Previous</Text>
          </TouchableOpacity>

           <TouchableOpacity 
            style={styles.btnStyle} 
            onPress={handleSkip}
            activeOpacity={0.7}
          >
            <Text style={styles.btnTextRight}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.btnStyle} 
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.7}
          >
            <Text style={styles.btnTextRight}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MedicalInfo;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "white",
    marginBottom: 20,
  },
  heading: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#0A66C2",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  HeaderStyle: {
    fontWeight: "500",
    fontSize: 16,
    marginTop: 12,
    color: "#333",
    marginBottom: 10,
    margin: 20,
  },
  textInputStyle: {
    color: "black",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    height: 40,
    width: "90%",
    alignSelf: "center",
  },
  btnStyle: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: "#ff3b30",
    fontSize: 14,
    marginLeft: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  btnText: {
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnTextLeft: {
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 16,
  },
  btnTextRight: {
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
    paddingHorizontal: 20,
  },
});