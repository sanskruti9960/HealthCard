import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm, Controller } from "react-hook-form";
import Styling from "./Styling";
import FirestoreService, { USER_DATA_TYPES } from "../Services/FirestoreService";

const PersonalDetails = ({ navigation }) => {
  const [genderOpen, setGenderOpen] = useState(false);
  const [bloodOpen, setBloodOpen] = useState(false);

  const genderItems = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const bloodItems = [
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ];

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      birthDate: "",
      gender: "",
      bloodGrp: "",
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const userData = await FirestoreService.getUserDataByType(
          USER_DATA_TYPES.PERSONAL
        );
        if (userData) {
          reset(userData);
          console.log("Loaded personal details from Firestore");
        }
      } catch (error) {
        console.log("Error loading personal details:", error);
      }
    })();
  }, [reset]);

  const onSubmit = useCallback(
    async (data) => {
      try {
        await FirestoreService.saveUserData(USER_DATA_TYPES.PERSONAL, data);
        console.log("Personal details saved successfully");
        Keyboard.dismiss();
        navigation.navigate("MedicalInfo");
      } catch (error) {
        console.log("Error saving personal details:", error);
        navigation.navigate("MedicalInfo");
      }
    },
    [navigation]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.heading}>User Details</Text>
        <Styling />

        {/* Single Card with All Inputs */}
        <View style={styles.inputCard}>
          <Text style={styles.label}>Full Name</Text>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Full Name"
                placeholderTextColor="#999"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.error}>{errors.fullName.message}</Text>
          )}

          <Text style={[styles.label, { marginTop: 16 }]}>Phone Number</Text>
          <Controller
            control={control}
            name="phone"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="Enter Phone Number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

          <Text style={[styles.label, { marginTop: 16 }]}>Birth Date</Text>
          <Controller
            control={control}
            name="birthDate"
            rules={{ required: "Birth date is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="DD-MON-YEAR"
                placeholderTextColor="#999"
                style={styles.textInputStyle}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.birthDate && (
            <Text style={styles.error}>{errors.birthDate.message}</Text>
          )}

          <Text style={[styles.label, { marginTop: 16 }]}>Gender</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { value } }) => (
              <DropDownPicker
                open={genderOpen}
                value={value}
                items={genderItems}
                setOpen={setGenderOpen}
                setValue={(cb) => setValue("gender", cb(value))}
                placeholder="Select Gender"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                zIndex={3000}
                zIndexInverse={1000}
              />
            )}
          />

          <Text style={[styles.label, { marginTop: 16 }]}>Blood Group</Text>
          <Controller
            control={control}
            name="bloodGrp"
            render={({ field: { value } }) => (
              <DropDownPicker
                open={bloodOpen}
                value={value}
                items={bloodItems}
                setOpen={setBloodOpen}
                setValue={(cb) => setValue("bloodGrp", cb(value))}
                placeholder="Select Blood Group"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                scrollViewProps={{
                  nestedScrollEnabled: true,
                  keyboardShouldPersistTaps: "handled",
                }}
                zIndex={2000}
                zIndexInverse={3000}
              />
            )}
          />
        </View>

        {/* Next Button */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.btnStyle, styles.btnFilled]}
            onPress={handleSubmit(onSubmit)}
            activeOpacity={0.8}
          >
            <Text style={styles.btnTextFilled}>Next</Text>
          </TouchableOpacity>

         
        </View>
      </View>
    </ScrollView>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F8FAFC" },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    margin: 5,
    color: "#1C75BC",
  },
  viewStyle: { flex: 1 },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 8,
    color: "#374151",
  },
  textInputStyle: {
    color: "#000",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  error: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 5,
  },
  dropdown: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginTop: 4,
    width: "100%",
    alignSelf: "center",
  },
  dropdownContainer: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    maxHeight: 320,
    width: "100%",
    alignSelf: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  btnStyle: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    minWidth: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  btnFilled: {
    backgroundColor: "transparent",
    elevation: 0,
  },
  btnTextFilled: {
    color: "#1C75BC",
    fontWeight: "bold",
    fontSize: 20,
    
  },
});
