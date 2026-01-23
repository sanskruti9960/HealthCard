import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Keyboard,
  Modal,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import DateTimePicker from "@react-native-community/datetimepicker";
import FirestoreService, { USER_DATA_TYPES } from "../Services/firestoreSrevice";
import { InteractionManager } from "react-native";

const PersonalDetails = ({ navigation }) => {
  // -------------------- FORM STATE --------------------
  const [fullName, setFullName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [bloodGrp, setBloodGrp] = useState("");
  const [saving, setSaving] = useState(false);

  // -------------------- ERROR STATE --------------------
  const [errors, setErrors] = useState({});

  // -------------------- UI STATE --------------------
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showBloodDropdown, setShowBloodDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // -------------------- OPTIONS --------------------
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

  // -------------------- LOAD DATA --------------------
  useEffect(() => {
    (async () => {
      try {
        const data = await FirestoreService.getUserDataByType(
          USER_DATA_TYPES.PERSONAL
        );
        if (data) {
          setFullName(data.fullName || "");
          setHeight(data.height || "");
          setWeight(data.weight || "");
          setBirthDate(data.birthDate || "");
          setAddress(data.address || "");
          setGender(data.gender || "");
          setBloodGrp(data.bloodGrp || "");
        }
      } catch (err) {
        console.log("Load error:", err);
      }
    })();
  }, []);

  // -------------------- VALIDATION --------------------
  const validate = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!height.trim()) newErrors.height = "Height is required";
    if (!weight.trim()) newErrors.weight = "Weight is required";
    if (!birthDate) newErrors.birthDate = "Birth date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // -------------------- SAVE --------------------
  const handleSave = async () => {
    if (!validate()) return;

    try {
      const payload = {
        fullName,
        height,
        weight,
        birthDate,
        address,
        gender,
        bloodGrp,
      };

      await FirestoreService.saveUserData(
        USER_DATA_TYPES.PERSONAL,
        payload
      );

      Keyboard.dismiss();
      navigation.navigate("MainTab");
    } catch (err) {
      console.log("Save error:", err);
    }
  };

  // -------------------- DATE PICKER --------------------
  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      const formatted = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setBirthDate(formatted);
    }
  };

  // -------------------- UI --------------------
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.viewStyle}>
        <Text style={styles.heading}>User Details</Text>
        <Text style={styles.subtitle}>
          "Your health is an investment, not an expense"
        </Text>

        {/* Full Name */}
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            left={<TextInput.Icon icon={() => <Icon name="person" size={20} color="#1C75BC" />} />}
            style={styles.paperInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#1C75BC"
            theme={{ roundness: 12 }}
          />
        </View>
        {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

        {/* Height */}
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Height (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            left={<TextInput.Icon icon={() => <Icon name="height" size={20} color="#1C75BC" />} />}
            style={styles.paperInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#1C75BC"
            theme={{ roundness: 12 }}
          />
        </View>
        {errors.height && <Text style={styles.error}>{errors.height}</Text>}

        {/* Weight */}
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Weight (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            left={<TextInput.Icon icon={() => <Icon name="monitor-weight" size={20} color="#1C75BC" />} />}
            style={styles.paperInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#1C75BC"
            theme={{ roundness: 12 }}
          />
        </View>
        {errors.weight && <Text style={styles.error}>{errors.weight}</Text>}

        {/* Birth Date */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              mode="outlined"
              label="Birth Date"
              value={birthDate}
              editable={false}
              left={<TextInput.Icon icon={() => <Icon name="event" size={20} color="#1C75BC" />} />}
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{ roundness: 12 }}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>
        {errors.birthDate && <Text style={styles.error}>{errors.birthDate}</Text>}

        {/* Address */}
        <View style={styles.inputContainer}>
          <TextInput
            mode="outlined"
            label="Address"
            value={address}
            onChangeText={setAddress}
            multiline
            numberOfLines={3}
            left={<TextInput.Icon icon={() => <Icon name="location-on" size={20} color="#1C75BC" />} />}
            style={styles.paperInput}
            outlineColor="#E2E8F0"
            activeOutlineColor="#1C75BC"
            theme={{ roundness: 12 }}
          />
        </View>

        {/* Gender */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShowGenderDropdown(true)}>
            <TextInput
              mode="outlined"
              label="Gender"
              value={gender}
              editable={false}
              right={<TextInput.Icon icon="menu-down" />}
              left={<TextInput.Icon icon={() => <Icon name="person-outline" size={20} color="#1C75BC" />} />}
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{ roundness: 12 }}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        {/* Blood Group */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setShowBloodDropdown(true)}>
            <TextInput
              mode="outlined"
              label="Blood Group"
              value={bloodGrp}
              editable={false}
              right={<TextInput.Icon icon="menu-down" />}
              left={<TextInput.Icon icon={() => <Icon name="bloodtype" size={20} color="#1C75BC" />} />}
              style={styles.paperInput}
              outlineColor="#E2E8F0"
              activeOutlineColor="#1C75BC"
              theme={{ roundness: 12 }}
              pointerEvents="none"
            />
          </TouchableOpacity>
        </View>

        {/* Save */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
  style={[styles.btnStyle, styles.btnFilled, saving && { opacity: 0.5 }]}
  onPress={handleSave}
  disabled={saving}
>
  <Text style={styles.btnTextFilled}>
    {saving ? "Saving..." : "Save"}
  </Text>
</TouchableOpacity>

        </View>
      </View>

      {/* Gender Modal */}
      <Modal visible={showGenderDropdown} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowGenderDropdown(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={genderItems}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setGender(item.value);
                    setShowGenderDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Blood Modal */}
      <Modal visible={showBloodDropdown} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowBloodDropdown(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={bloodItems}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    setBloodGrp(item.value);
                    setShowBloodDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={handleDateChange}
        />
      )}
    </ScrollView>
  );
};

export default PersonalDetails;
const styles = StyleSheet.create({
  container: { 
    padding: 20,
    backgroundColor: "#F8FAFC",
    flex: 1,
    justifyContent: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    margin: 5,
    color: "#1C75BC",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 50,
    color: "#64748B",
  },
  viewStyle: {
     flex: 1,
    justifyContent: "center",
    },


  inputContainer: {
    marginBottom: 8,
    marginTop: 4,
    width: '100%',
  },
  paperInput: {
    backgroundColor: 'white',
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
    color: "#374151",
  },
  error: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 2,
    marginBottom: 10,
    textAlign: "left",
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '80%',
    maxHeight: '70%',
    overflow: 'hidden',
    elevation: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
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