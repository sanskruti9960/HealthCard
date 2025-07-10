{/*import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert
} from 'react-native'

const Signup = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = () => {
    Alert.alert(
      'Sign Up Successful',
      Name: ${fullName}\nEmail: ${email}
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {/* 3D Image Icon 
      <Image
        source={require('./assets/signup-3d-icon.png')}
        style={styles.icon}
      />

      {/* Input fields 
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        placeholder="Email Address"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

       Sign Up button 
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      /* Footer text 
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link}>Log In</Text>
      </Text>
    </ScrollView>
  )


export default Signup

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#222',
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#f2f2f2',
    marginBottom: 15,
    fontSize: 16,
    textShadowColor:'white'
  },
  button: {
    backgroundColor: '#9C27B0',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#9C27B0',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    color: '#555',
  },
  link: {
    color: '#9C27B0',
    fontWeight: '600',
  },
})*/}

{/* Dummy Health Card Logo 
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image source={{ uri: 'https://via.placeholder.com/150x50?text=Health+Card+Logo' }} style={{ width: 150, height: 50 }} />
      </View>*/}
// import React, { useState } from 'react'
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native'
// import CheckBox from '@react-native-community/checkbox'
// import Ionicons from 'react-native-vector-icons/Ionicons'

// const Signup = () => {
//   const [fullName, setFullName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [agree, setAgree] = useState(false)

//   return (
//      <ImageBackground
//        source={{
//          uri: 'https://img.freepik.com/premium-photo/blue-paper-linkedin-abstract-background_608068-5090.jpg',
//        }}
//        resizeMode="cover"
//        style={styles.backgroundImage}
//     >
//       <KeyboardAvoidingView
//         style={{ flex: 1 }}
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       >
//         <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
//           <View style={styles.overlay}>
//             <View style={styles.container}>
//               <Text style={styles.title}>Sign up</Text>

//               <Text style={styles.label}>Full Name</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
//                 <TextInput
//                    placeholder="Enter your full name"
//                   placeholderTextColor="#aaa"
//                   style={styles.input}
//                   value={fullName}
//                   onChangeText={setFullName}
//                 />
//               </View>

//               <Text style={styles.label}>Email Address</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
//                 <TextInput
//                   placeholder="Enter your email"
//                   placeholderTextColor="#aaa"
//                   style={styles.input}
//                   value={email}
//                   onChangeText={setEmail}
//                 />
//               </View>

//               <Text style={styles.label}>Password</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
//                 <TextInput
//                   placeholder="Enter password"
//                   placeholderTextColor="#aaa"
//                   style={styles.input}
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry
//                 />
//               </View>

//               <Text style={styles.label}>Confirm Password</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
//                 <TextInput
//                   placeholder="Confirm your password"
//                   placeholderTextColor="#aaa"
//                   style={styles.input}
//                   value={confirmPassword}
//                   onChangeText={setConfirmPassword}
//                   secureTextEntry
//                 />
//               </View>

//               <View style={styles.checkboxContainer}>
//                 <CheckBox
//                   value={agree}
//                   onValueChange={() => setAgree(!agree)}
//                   tintColors={{ true: '#1C75BC', false: '#aaa' }}
//                 />
//                 <Text style={styles.checkboxLabel}>I agree with Privacy Policy</Text>
//               </View>

//               <TouchableOpacity style={styles.loginButton}>
//                 <Text style={styles.buttonText}>Sign up</Text>
//               </TouchableOpacity>

//               <Text style={styles.orText}>------------------------or sign up with------------------------</Text>

//               <View style={styles.socialButtons}>
//                 <TouchableOpacity style={styles.oauthButton}>
//                   <Ionicons name="logo-facebook" size={20} color="#3b5998" />
//                   <Text style={styles.oauthText}>Facebook</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.oauthButton}>
//                   <Image
//                     source={{
//                       uri: 'https://storage.googleapis.com/libraries-lib-production/images/GoogleLogo-canvas-404-300px.original.png',
//                     }}
//                     style={styles.googleLogo}
//                   />
//                   <Text style={styles.oauthText}>Google</Text>
//                 </TouchableOpacity>
//               </View>

//               <View style={styles.footerText}>
//                 <Text style={styles.footer}>Already have an account?</Text>
//                 <TouchableOpacity>
//                   <Text style={styles.signupLink}> Login</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//      </ImageBackground>
//   )
// }

// export default Signup

// const styles = StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
//   },
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     justifyContent: 'center',
//   },
//   container: {
//     padding: 24,
//     backgroundColor: 'rgba(255,255,255,0.95)',
//     margin: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#1C75BC',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     color: '#000',
//     marginBottom: 6,
//     marginLeft: 4,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f1f1f1',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255, 255, 255, 0.85)',
//     paddingHorizontal: 10,
//     marginBottom: 16,
//   },
//   icon: {
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     height: 45,
//     fontSize: 14,
//     color: '#222',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     color: '#0A66C2'
//   },
//   checkboxLabel: {
//     marginLeft: 8,
//     color: '#333',
//     fontSize: 13,
//   },
//   loginButton: {
//     backgroundColor: '#1C75BC',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   orText: {
//     textAlign: 'center',
//     color: 'gray',
//     marginBottom: 16,
//     fontSize: 13,
//   },
//   socialButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginBottom: 24,
//   },
//   oauthButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 10,
//     backgroundColor: '#f5f5f5',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   googleLogo: {
//     width: 22,
//     height: 18,
//     marginRight: 8,
//   },
//   oauthText: {
//     marginLeft: 6,
//     fontSize: 14,
//     color: '#444',
//   },
//   footerText: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: -5,
//   },
//   footer: {
//     fontSize: 13,
//     color: '#444',
//   },
//   signupLink: {
//     fontSize: 13,
//     color: '#1C75BC',
//     fontWeight: 'bold',
//   },
// })import React, { useState } from 'react';
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
  StatusBar
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

import Animation1 from './img/Animation1.json'; // Keep this animation at top

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
         <StatusBar
      backgroundColor="#F8F9FF"  // match your wrapper1 bg
      barStyle="dark-content"    // dark text/icons
    />

        {/* Top Lottie Animation */}
        <LottieView
          source={Animation1}
          autoPlay
          loop
          style={styles.topAnimation}
        />

        <View style={styles.container}>
          <Text style={styles.title}>
            Sign <Text style={styles.highlight}>Up</Text>
          </Text>
          <Ionicons
            name="qr-code-outline"
            size={22}
            color="#1C75BC"
            style={styles.qrIcon}
          />
          {/* Subtitle */}
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>Create a new account</Text>

          </View>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

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

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={agree}
              onValueChange={() => setAgree(!agree)}
              tintColors={{ true: '#1C75BC', false: '#aaa' }}
            />
            <Text style={styles.checkboxLabel}>I agree to terms and conditions</Text>
          </View>

          {/* Create Account Button */}
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerText}>
            <Text style={styles.footer}>Already have an account?</Text>
            <TouchableOpacity>
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
    backgroundColor: 'white',
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
    marginRight:10
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
    marginTop:15
  },
  qrIcon: {
    marginLeft:"67%",
    marginTop: -26,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#333',
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#1C75BC',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
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