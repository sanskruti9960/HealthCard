import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // 'success' or 'error'
  const navigation = useNavigation();

  // Email validation feedback
  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    if (!email.includes('@') || !/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format.";
    return "";
  };

  const handleInputChange = (text) => {
    setEmailOrPhone(text);
    setEmailError(validateEmail(text.trim().toLowerCase()));
  };

  const handleSubmit = async () => {
    const email = emailOrPhone.trim().toLowerCase();
    const errorMsg = validateEmail(email);
    setEmailError(errorMsg);
    if (errorMsg) return;

    setLoading(true);
    setResendDisabled(true);
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setModalType("success");
      setModalMessage(`Password reset email sent to ${email}`);
      setModalVisible(true);
    } catch (error) {
      console.log("Reset error:", error.message);
      setModalType("error");
      if (error.code === 'auth/user-not-found') {
        setModalMessage("No account found with that email.");
      } else if (error.code === 'auth/invalid-email') {
        setModalMessage("Invalid email format.");
      } else {
        setModalMessage("Something went wrong. Try again later.");
      }
      setModalVisible(true);
    } finally {
      setLoading(false);
      setTimeout(() => setResendDisabled(false), 5000); // 5s timer
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Forgot Password</Text>
        <Text style={styles.subtext}>
          Enter your registered email to receive a reset link.
        </Text>

        <TextInput
          style={[styles.input, emailError && { borderColor: 'red' }]}
          placeholder="Email"
          value={emailOrPhone}
          onChangeText={handleInputChange}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#aaa"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TouchableOpacity style={[styles.button, resendDisabled && { opacity: 0.6 }]} onPress={handleSubmit} disabled={resendDisabled}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Send Reset Link</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>
            <Ionicons name="arrow-back" size={16} color="#1C75BC" /> Back to Login
          </Text>
        </TouchableOpacity>

        {/* Modal for alerts */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={[styles.modalTitle, modalType === 'success' ? styles.modalTitleSuccess : styles.modalTitleError]}>
                {modalType === 'success' ? 'Success' : 'Error'}
              </Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(false);
                  if (modalType === 'success') navigation.goBack();
                }}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    backgroundColor: "#f7f9fc",
    paddingVertical: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
    color: "#1a1a1a",
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 25,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: "#1C75BC",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 17,
    fontWeight: "600",
  },
  backText: {
    color: "#1C75BC",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 2,
    textAlign: 'left',
  },
  // Add modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalTitleSuccess: {
    color: '#1C75BC',
  },
  modalTitleError: {
    color: '#d9534f',
  },
  modalMessage: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#1C75BC',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

