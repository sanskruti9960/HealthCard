import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Animation1 from './img/Animation1.json';

const Signup = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required*';
    if (!email.trim()) newErrors.email = 'Email is required*';
    if (!password.trim()) newErrors.password = 'Password is required*';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (validate()) {
      Alert.alert('Signup Successful', `Welcome, ${fullName.trim()}!`);
      navigation.navigate('OtpVerification');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar backgroundColor="#F8F9FF" barStyle="dark-content" />

        <LottieView source={Animation1} autoPlay loop style={styles.topAnimation} />

        <View style={styles.container}>
          <Text style={styles.title}>
            Sign <Text style={styles.highlight}>Up</Text>
          </Text>
          <Ionicons name="qr-code-outline" size={22} color="#1C75BC" style={styles.qrIcon} />

          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>Create a new account</Text>
          </View>

          {/* Full Name */}
          <View
            style={[
              styles.inputContainer,
              errors.fullName && styles.errorInputContainer,
            ]}
          >
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={fullName}
              onChangeText={text => {
                setFullName(text);
                if (errors.fullName) setErrors({ ...errors, fullName: null });
              }}
            />
          </View>
          {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

          {/* Email */}
          <View
            style={[
              styles.inputContainer,
              errors.email && styles.errorInputContainer,
            ]}
          >
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (errors.email) setErrors({ ...errors, email: null });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Password */}
          <View
            style={[
              styles.inputContainer,
              errors.password && styles.errorInputContainer,
            ]}
          >
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={password}
              onChangeText={text => {
                setPassword(text);
                if (errors.password) setErrors({ ...errors, password: null });
              }}
              secureTextEntry
            />
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          {/* Create Account Button */}
          <TouchableOpacity
            style={[
              styles.loginButton,
              (!fullName || !email || !password) && styles.disabledButton,
            ]}
            onPress={handleSignup}
          >
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerText}>
            <Text style={styles.footer}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.signupLink}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
  },
  topAnimation: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginBottom: -65,
    marginTop: -40,
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginTop: -10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginRight: 10,
  },
  highlight: {
    color: '#1C75BC',
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
  },
  qrIcon: {
    marginLeft: '67%',
    marginTop: -26,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 90,
    paddingHorizontal: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorInputContainer: {
    borderColor: 'red',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
    color: '#222',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: '#1C75BC',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -5,
  },
  footer: {
    fontSize: 13,
    color: '#444',
  },
  signupLink: {
    fontSize: 13,
    color: '#1C75BC',
    fontWeight: 'bold',
  },
});
