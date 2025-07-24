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
      insuranceProvider: "",
      policyNumber: "",
      insuranceContact: "",
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
      const personalDetails = await AsyncStorage.getItem('personalDetails');
      const emergencyContact = await AsyncStorage.getItem('emergencyContact');
      const medicalInfo = await AsyncStorage.getItem('medicalInfo');
      
      return {
        personalDetails: personalDetails ? JSON.parse(personalDetails) : {},
        emergencyContact: emergencyContact ? JSON.parse(emergencyContact) : {},
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
      navigation.navigate("ScreenName"); // Replace with the next screen name
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }, [navigation]);

  const handlePrevious = useCallback(() => {
    navigation.navigate("EmergencyContact");
  }, [navigation]);

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
        </View>

        <Divider />
        <Text style={styles.heading}>Medical Insurance</Text>
        <Divider />

        {/* Insurance Provider */}
        <Text style={styles.HeaderStyle}>Insurance Provider Company:</Text>
        <Controller
          control={control}
          name="insuranceProvider"
          rules={{ required: "Provider is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.insuranceProvider && (
          <Text style={styles.error}>{errors.insuranceProvider.message}</Text>
        )}

        {/* Policy Number (Optional) */}
        <Text style={styles.HeaderStyle}>Policy Number</Text>
        <Controller
          control={control}
          name="policyNumber"
          rules={{ required: "Policy number is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Policy no."
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.policyNumber && (
          <Text style={styles.error}>{errors.policyNumber.message}</Text>
        )}

        {/* Contact for Insurance Claims (Optional) */}
        <Text style={styles.HeaderStyle}>Contact for Insurance Claims</Text>
        <Controller
          control={control}
          name="insuranceContact"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Contact no."
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />

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
    backgroundColor: "#fff",
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
