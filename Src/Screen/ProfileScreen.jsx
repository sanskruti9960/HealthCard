import React, { useEffect, useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  Button,
  TextInput,
  ToastAndroid, // for warning mssg
  Platform
} from "react-native";
import ImageCropPicker from 'react-native-image-crop-picker';
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import LogoutModal from '../Components/LogoutModal';
import { db } from "../firebaseConfig";
import {getDoc, doc, setDoc, deleteField, updateDoc, } from 'firebase/firestore';

  const ProfileScreen = ({ navigation }) => {
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [modalVisible, setModalVisible] = useState(false); //modal for image selection
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState('');

  const userId = 'ehZZomSJUjdldgJFJ5hCLVYMqkA3'; // Replace with dynamic ID if needed
  // const userId = auth().currentUser?.uid;

  const handleImagePress = () => {
    setModalVisible(true);
  };

  const selectFromGallery = async () => {
  try {
    const image = await ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.8,
      includeBase64: true, 
    });

    if (image?.data) {
      const base64data = `data:${image.mime};base64,${image.data}`;

      // Save immediately to Firestore
      await saveProfileImageToFirestore(base64data);

      // Update state so it shows instantly
      setProfileImage(base64data);

      setModalVisible(false);
    }
  } catch (error) {
    console.log('Gallery cancelled or failed:', error);
  }
};

//saving pfp to firestore
const saveProfileImageToFirestore = async (base64Image) => {
  try {
    await setDoc(doc(db, "Siddhi", userId), {
      profileImageBase64: base64Image
    }, { merge: true });
showWarning("⚠️ Profile image updated ");
    
  } catch (error) {
   
  }
};
// fetcching pfp to firestore
const fetchProfileFromFirestore = async () => {
  try {
    const docRef = doc(db, "Siddhi", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.profileImageBase64) {
        setProfileImage(data.profileImageBase64);
      }
    } else {
    }
  } catch (error) {
  
  }
};
useEffect(() => {
  fetchProfileFromFirestore();
}, []);

// removing pfp from firestore
const removeProfileImage = async (userId) => {
  try {
    await updateDoc(doc(db, "Siddhi", userId), {
      profileImageBase64: deleteField()
    });

    setProfileImage(""); // instantly remove from UI
    showWarning("⚠️ Profile image removed");
  } catch (error) {
    console.error("Error removing profile image:", error);
  }
};

//warning after uploding the image
const showWarning = (message) => {
  if (Platform.OS === 'android') {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.TOP
    );
  } else {
    console.warn(message); // For iOS fallback
  }
};


  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const docRef = doc(db, 'Siddhi', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setFullName(userData.fullName); //Set the name to state
        } else {
          // console.log('No such user!');
        }
      } catch (error) {
        // console.error('Error getting user data:', error);
      }
    };
    fetchUserName();
  }, []);

  

  return (
    <View style={style.Screen}>

      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={{ flexDirection: 'row', alignItems: 'center', height: 50 }}>
  {/* Back Button */}
  <TouchableOpacity
    style={{ position: 'absolute', left: 0 }}
    onPress={() => Alert.alert('Back to Home screen')}
  >
    <Ionicons
      style={style.backIcon}
      name={"arrow-back"}
      size={30}
      color="#000"
    />
  </TouchableOpacity>

  {/* Title */}
  <Text style={{ flex: 1, textAlign: 'center', fontSize: 22, fontWeight: '600' }}>
    Profile
  </Text>
</View>

      <View style={style.cardWrapper}>
        <View style={style.bodySection}>
          <TouchableOpacity onPress={handleImagePress}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require('../Images/placeholder.png') // use your default image
              }
              style={style.avatarImage}
            />
          </TouchableOpacity>

          {/* name functionality */}
          <View style={style.namerow}>
            {isEditingName ? (
              <TextInput
                style={style.nameInput}
                value={fullName}
                onChangeText={setFullName}
                autoFocus
                onBlur={async () => {
                  try {
                    setIsEditingName(false);
                    if (userId && fullName.trim() !== '') {
                      await setDoc(
                        doc(db, 'Siddhi', userId),
                        { fullName: fullName.trim() },
                        { merge: true }
                      );
                      console.log('Name updated successfully in Firestore');
                    }
                  } catch (error) {
                    console.error('Error updating name:', error);
                  }
                }}
              />
            ) : (
              <Text style={style.nameText}>{fullName}</Text>
            )}

            <TouchableOpacity
              style={style.editIcon}
              onPress={() =>
                setIsEditingName(true)}
            >
              <Feather name="edit" size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => navigation.navigate('AccountDetailsScreen')}>
          <MaterialIcons name="account-circle" size={20} color="#7FBCE5" style={{ marginLeft: 8 }} />
          <Text style={style.SettingsText}>Account Details</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => navigation.navigate('QRScreen')}>
          <FontAwesome6 name="qrcode" size={19} color="#7FBCE5" style={{ marginLeft: 8 }} />
          <Text style={style.SettingsText}>QR Code Preview</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <MaterialIcons name="edit" size={19} color="#7FBCE5" style={{ marginLeft: 8 }} />
          <Text style={style.SettingsText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => Alert.alert('Contact Us information')}>
          <MaterialIcons name="mail" size={19} color="#7FBCE5" style={{ marginLeft: 8 }} />
          <Text style={style.SettingsText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={style.settingsSection}
          onPress={() => navigation.navigate('PrivacyPolicyScreen')}
        >
          <MaterialIcons name="privacy-tip" size={19} color="#7FBCE5" style={{ marginLeft: 8 }} />
          <Text style={style.SettingsText}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={[style.settingsSection, { justifyContent: 'center' }]}
          onPress={() => setLogoutVisible(true)}>
          <Text style={{ color: 'red', fontWeight: '500', fontSize: 16 }}>Logout</Text>
        </TouchableOpacity>
        <LogoutModal
          visible={isLogoutVisible}
          onClose={() => setLogoutVisible(false)}
        />
      </View>

{/* temp buttons to see contact screen and dashboard  */}
<Button
  title="cnt screen"
  onPress={() => navigation.navigate('EmergencyContactScreen')}
/>
<Button
  title="DoctorSuggestionScreen"
  onPress={() => navigation.navigate('DoctorSuggestionScreen')}
/>
<Button
  title="Signup"
  onPress={() => navigation.navigate('Signup')}
/>


      {/* Modal pop up for adding and removing image */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={style.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={style.modalContainer}>
            <TouchableOpacity style={style.modalButton} onPress={selectFromGallery} >
              <Text style={style.modalButtonText}>Add Image</Text>

            </TouchableOpacity>

            <TouchableOpacity
              style={style.modalButton}
              onPress={async () => {
                await removeProfileImage(userId);
                setProfileImage(); // Also remove it from state so UI updates
                setModalVisible(false);
              }}
            >
              <Text style={style.modalButtonText}>Remove Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={[style.modalButtonText, { color: 'red' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* modal for editing name here  */}
    </View>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  backIcon: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  cardWrapper: {
    backgroundColor: '#F8F8F9',
    marginHorizontal: 16,
    marginTop: 25,
    borderRadius: 16,
    elevation: 1,
  },
  bodySection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: '#1b47d2',
  },
  namerow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000',
    marginLeft: 10,
  },
  editIcon: {
    backgroundColor: '#eef6fa',
    padding: 5,
    borderRadius: 20,
    elevation: 1,
    marginLeft: 10,
  },
  settingsSection: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F8F9',
    borderRadius: 20,
    margin: 10,
    marginBottom: 0,
    elevation: 1,
  },
  SettingsText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#000',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalButton: {
    paddingVertical: 10,
  },
  modalButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  modalButtonTextRed: {
    color: 'red',
  },
  nameInput: {
    fontSize: 18,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    width: 180,
  },
});
