import React, { useCallback, useEffect } from "react";
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
import Styling from "./Styling";
import { useForm, Controller } from "react-hook-form";

const MedicalInfo = ({ navigation }) => {
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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('medicalInfo');
      if (savedData) {
        const data = JSON.parse(savedData);
        reset(data);
      }
    } catch (error) {
      console.log('Error loading data:', error);
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
      
      // Get all form data for backend integration
      const allFormData = await getAllFormData();
      console.log("Complete Form Data:", allFormData);
      
      Keyboard.dismiss();
      navigation.navigate("StartInsuranceFile"); // Replace with the next screen name
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }, [navigation]);

  const handlePrevious = useCallback(() => {
    navigation.navigate("EmergencyContact");
  }, [navigation]);

  const handleSkip = useCallback(async () => {
    try {
      // Get current form values without validation
      const currentValues = control._formValues;
      await AsyncStorage.setItem('medicalInfo', JSON.stringify(currentValues));
      
      Keyboard.dismiss();
      navigation.navigate("StartInsuranceFile");
    } catch (error) {
      console.log('Error saving data on skip:', error);
      // Navigate anyway even if save fails
      navigation.navigate("StartInsuranceFile");
    }
  }, [navigation, control]);

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
    marginTop: 5,
    marginBottom: 10,
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
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
