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
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animation2 from './img/Animation2.json'

const { width } = Dimensions.get('window');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LinearGradient
      colors={['#f0f4ff', '#ffffff']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* 🔷 Header Image */}
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/99/35/ce/9935ce5f3b1d6cb6bc86287cd927d03e.jpg' }}
            style={styles.headerImage}
          />

          {/* Optional intro text */}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Your emergency access, simplified.</Text>
          </View>

          {/* 🔘 Card Container */}
          <View style={styles.container}>
            {/* ✅ Lottie Animation */}
              <LottieView
          source={Animation2}
          autoPlay
          loop
         
              style={styles.lottie}
            />

            <Text style={styles.title}>
              Welcome <Text style={styles.highlight}>Back</Text>
            </Text>

            {/* Subtitle + QR Icon */}
            <View style={styles.subtitleRow}>
              <Text style={styles.subtitle}>Login to your account</Text>
              <Ionicons
                name="qr-code-outline"
                size={22}
                color="#1C75BC"
                style={styles.qrIcon}
              />
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Email or Phone Number"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Password Field */}
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotContainer}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Google Login Button */}
            <TouchableOpacity style={styles.googleButton}>
              <Ionicons name="logo-google" size={20} color="#1C75BC" style={{ marginRight: 8 }} />
              <Text style={styles.googleText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footerText}>
              <Text style={styles.footer}>Don't have an account?</Text>
              <TouchableOpacity>
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
  lottie: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: -10,
    marginTop: -20,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1C75BC',
    borderRadius: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleText: {
    color: '#1C75BC',
    fontWeight: 'bold',
    fontSize: 14,
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
  lottie: {
  width: 100,
  height: 100,
  alignSelf: 'center',
  marginBottom: -10,
  marginTop: -20,
},

});