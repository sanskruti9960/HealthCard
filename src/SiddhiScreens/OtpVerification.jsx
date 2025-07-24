import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '']); // 4-digit OTP
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
     navigation.navigate('PersonalDetails')
    if (otpValue.length !== 4) {
      Alert.alert('Error', 'Please enter all 4 digits');
     
      return;
    }

    Alert.alert('Success', `OTP Verified: ${otpValue}`);
    // Navigate or perform next action
  };

  const handleResend = () => {
    Alert.alert('OTP Resent', 'A new OTP has been sent to your number/email.');
    // Trigger resend API here
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>OTP Verification</Text>
        <Text style={styles.subtitle}>Enter the 4-digit code sent to your number</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputs.current[index] = ref)}
              style={styles.otpBox}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Didn't receive code? <Text style={styles.resendLink}>Resend</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f8f9fd',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    shadowColor: '#1C75BC',
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    shadowColor: '#1C75BC', // match verify button bg color
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  verifyButton: {
    backgroundColor: '#1C75BC',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#1C75BC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  verifyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
  },
  resendText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  resendLink: {
    color: '#007AFF',
    fontWeight: '500',
  },
});
