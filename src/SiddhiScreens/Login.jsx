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
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { getFirestore, doc, getDoc } from '@react-native-firebase/firestore';
const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required*';
      valid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required*';
      valid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required*';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    // Normalize phone number: remove non-digits, take last 10 digits
    const normalizePhone = (num) => num.replace(/\D/g, '').slice(-10);
    const enteredPhone = normalizePhone(phone);

    try {
      // 1. Sign in with Firebase Auth (modular API)
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // 2. Fetch user data from Firestore (modular API)
      const firestore = getFirestore();
      const userDocRef = doc(firestore, 'Siddhi', uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists) {
        Alert.alert('Error', 'No user data found in Firestore.');
        return;
      }

      const userData = userDoc.data();
      const storedPhone = userData.phone ? normalizePhone(userData.phone) : '';

      // 3. Compare phone number from Firestore with entered one
      if (storedPhone !== enteredPhone) {
        Alert.alert('Phone Mismatch', 'The phone number does not match our records.');
        return;
      }

      // 4. Navigate to OTP screen with phone + UID
      navigation.navigate('OtpVerification', {
        uid: uid,
        phone: userData.phone,
        from: 'login', // to tell OTP screen this is from login
      });

    } catch (error) {
      console.error('Login Error:', error);
      let message = error.message;

      if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email.';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password.';
      }

      Alert.alert('Login Failed', message);
    }
  };

  return (
    <LinearGradient colors={['#f0f4ff', '#fff']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/99/35/ce/9935ce5f3b1d6cb6bc86287cd927d03e.jpg',
            }}
            style={styles.headerImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Your emergency access, simplified.</Text>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>
              Welcome <Text style={styles.highlight}>Back</Text>
            </Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>Login to your account</Text>
              <Ionicons name="qr-code-outline" size={22} color="#1C75BC" style={styles.qrIcon} />
            </View>

            {/* Email */}
            <View style={[styles.inputContainer, errors.email && { borderColor: 'red' }]}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
              />
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Phone */}
            <View style={[styles.inputContainer, errors.phone && { borderColor: 'red' }]}>
              <Ionicons name="call-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor="#aaa"
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={text => {
                  setPhone(text);
                  if (errors.phone) setErrors({ ...errors, phone: undefined });
                }}
              />
            </View>
            {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

            {/* Password */}
            <View style={[styles.inputContainer, errors.password && { borderColor: 'red' }]}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                secureTextEntry
              />
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.loginButton,
                (!email || !password || !phone) && styles.disabledButton,
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-S3qWcvePdfZilsn8f2X1KXTC6vZ0xjQPgQ&s',
                }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.footerText}>
              <Text style={styles.footer}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default Login;




const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  headerImage: {
    width: width,
    height: 260,
    resizeMode: 'cover',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTextContainer: {
    alignItems: 'center',
    marginTop: 12,
    marginBottom: -50,
  },
  headerText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
  container: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    padding: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    marginHorizontal: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
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
  },
  qrIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 90,
    paddingHorizontal: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
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
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotText: {
    color: '#1C75BC',
    fontSize: 13,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#1C75BC',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
  },
  googleIcon: {
    width: 35,
    height: 20,
    marginRight: 5,
  },
  googleText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
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
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 8,
    marginLeft: 8,
    alignSelf: 'flex-start',
  },
});
