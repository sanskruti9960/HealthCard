import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet,
  TouchableOpacity, Alert, TouchableWithoutFeedback
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';


const ChangePasswordScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false); //eye toggle for current password
  const [showNew, setShowNew] = useState(false); //eye toggle for new password
  const [showConfirm, setShowConfirm] = useState(false); //eye toggle for confirm password

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('New passwords do not match');
      return;
    }
    Alert.alert('Password changed successfully');
  };

  const renderPasswordInput = (placeholder, value, setValue, show, setShow) => (
    <View style={styles.passwordWrapper}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={!show}
        style={styles.input}
        value={value}
        onChangeText={setValue}
      />
      <TouchableWithoutFeedback onPress={() => setShow(!show)}>
        <Feather
          name={show ? 'eye' : 'eye-off'}
          size={20}
          color="#555"
          style={styles.eyeIcon}
        />
      </TouchableWithoutFeedback>
    </View>
  );

  return (
    <View style={styles.container}>

<Text style={styles.title}>Change Password</Text>
      {renderPasswordInput("Current Password", currentPassword, setCurrentPassword, showCurrent, setShowCurrent)}
      {renderPasswordInput("New Password", newPassword, setNewPassword, showNew, setShowNew)}
      {renderPasswordInput("Confirm New Password", confirmPassword, setConfirmPassword, showConfirm, setShowConfirm)}

      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Update Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#333',
    paddingLeft:10,
  },
  passwordWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingRight: 44, 
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
