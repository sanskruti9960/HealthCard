import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  Keyboard,
} from "react-native";
import { Divider } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styling from "./Styling";
import { useForm, Controller } from "react-hook-form";

const PersonalDetails = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
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
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('personalDetails');
      if (savedData) {
        const data = JSON.parse(savedData);
        reset(data);
      }
    } catch (error) {
      console.log('Error loading data:', error);
    }
  };

  const onSubmit = useCallback(async (data) => {
    try {
      await AsyncStorage.setItem('personalDetails', JSON.stringify(data));
      Keyboard.dismiss();
      console.log("Form Data: ", data);
      navigation.navigate("MainTab");
    } catch (error) {
      console.log('Error saving data:', error);
    }
  }, [navigation]);

  // Gender Dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]);

  // Blood Group Dropdown
  const [bloodOpen, setBloodOpen] = useState(false);
  const [bloodItems, setBloodItems] = useState([
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ]);

  return (
    <FlatList
      data={[]}
      style={styles.flatList}
      contentContainerStyle={styles.flatListContent}
      ListHeaderComponent={
        <View style={styles.viewStyle}>
          <Text style={styles.heading}>User Details</Text>
          <Styling />

          {/* Full Name */}
          <Text style={styles.HeaderStyle}>Full Name :</Text>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInputStyle}
                placeholder="Name"
                placeholderTextColor="grey"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.error}>{errors.fullName.message}</Text>
          )}

          {/* Phone Number */}
          <Text style={styles.HeaderStyle}>Phone Number :</Text>
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
                placeholder="Phone no."
                placeholderTextColor="grey"
                keyboardType="phone-pad"
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.phone && (
            <Text style={styles.error}>{errors.phone.message}</Text>
          )}

          {/* Birth Date */}
          <Text style={styles.HeaderStyle}>Birth Date :</Text>
          <Controller
            control={control}
            name="birthDate"
            rules={{ required: "Birth date is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="DD-MON-YEAR"
                placeholderTextColor="grey"
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

          {/* Gender Dropdown */}
          <Text style={styles.HeaderStyle}>Gender :</Text>
          <DropDownPicker
            open={genderOpen}
            value={watch('gender')}
            items={genderItems}
            setOpen={setGenderOpen}
            setValue={(callback) => {
              const newValue = callback(watch('gender'));
              setValue('gender', newValue);
            }}
            setItems={setGenderItems}
            placeholder="Select Gender"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
          />

          {/* Blood Group Dropdown */}
          <Text style={styles.HeaderStyle}>Blood Group :</Text>
          <DropDownPicker
            open={bloodOpen}
            value={watch('bloodGrp')}
            items={bloodItems}
            setOpen={setBloodOpen}
            setValue={(callback) => {
              const newValue = callback(watch('bloodGrp'));
              setValue('bloodGrp', newValue);
            }}
            setItems={setBloodItems}
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

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={handleSubmit(onSubmit)}
              activeOpacity={0.7}
            >
              <Text style={styles.btnText}>Next</Text>
            </TouchableOpacity>
          </View>

          <Divider />
        </View>
      }
      keyExtractor={(item, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
    />
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#0A66C2",
  },
  HeaderStyle: {
    fontWeight: "500",
    fontSize: 16,
    marginTop: 12,
    color: "#333",
    marginBottom: 10,
    marginLeft: 20,
  },
  textInputStyle: {
    color: "black",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 5,
    height: 45,
    width: "90%",
    paddingHorizontal: 10,
    borderWidth: 0,
    alignSelf: "center",
  },
  error: {
    color: "#ff3b30",
    fontSize: 14,
    marginLeft: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  btnStyle: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "#F5F5F5",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 4,
    width: "90%",
    alignSelf: "center",
    marginBottom: 5,
  },
  dropdownContainer: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 15,
    maxHeight: 320,
  },
  flatList: {
    flex: 1,
    backgroundColor: "white",
  },
  flatListContent: {
    padding: 16,
    paddingBottom: 40,
  },
});