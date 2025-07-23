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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    const isValid = validate();
    if (isValid) {
      // Proceed with login (dummy for now)
      console.log('Login success');
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <LinearGradient colors={['#f0f4ff', '#ffffff']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header Image */}
          <Image
            source={{
              uri: 'https://i.pinimg.com/736x/99/35/ce/9935ce5f3b1d6cb6bc86287cd927d03e.jpg',
            }}
            style={styles.headerImage}
          />

          {/* Intro Text */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Your emergency access, simplified.</Text>
          </View>

          {/* Card Container */}
          <View style={styles.container}>
            <Text style={styles.title}>
              Welcome <Text style={styles.highlight}>Back</Text>
            </Text>

            {/* Subtitle Row */}
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>Login to your account</Text>
              <Ionicons name="qr-code-outline" size={22} color="#1C75BC" style={styles.qrIcon} />
            </View>

            {/* Email Field */}
            <View style={[
              styles.inputContainer,
              errors.email && { borderColor: 'red' }
            ]}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Email or Phone Number"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
              />
            </View>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            {/* Password Field */}
            <View style={[
              styles.inputContainer,
              errors.password && { borderColor: 'red' }
            ]}>
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
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                (!email || !password) && styles.disabledButton
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton}>
              <Image
                source={{
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-S3qWcvePdfZilsn8f2X1KXTC6vZ0xjQPgQ&s',
                }}
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Footer Text */}
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
