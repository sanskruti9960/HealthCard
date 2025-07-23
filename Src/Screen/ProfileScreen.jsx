import React, {useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SectionList,
  StatusBar,
  Image,
  Alert,
  Button,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PrivacyPolicyModal from '../Components/PrivacyPolicyModal';
import LogoutModal from '../Components/LogoutModal';

const ProfileScreen = ({ navigation }) => {
  const [isPrivacyVisible, setPrivacyVisible] = useState(false);
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  return (
    <View style={style.Screen}>

      {/* Header */}
      <View style={{ flexDirection: 'row' }}>

        <TouchableOpacity style={{ postion: 'static' }}
        onPress={() => Alert.alert('Back to Home screen')}>
          <Ionicons
            style={style.backIcon}
            name={"chevron-back"}
            size={35}
            color="#000"
          />
        </TouchableOpacity>
        <Text style={{ marginTop: 13, padding: 5, fontSize: 22, fontWeight: 600, textAlign: 'center' }}>Settings</Text>
      </View>

      {/* Main White Card */}
      <View style={style.cardWrapper}>
        {/* Body Section */}
        <View style={style.bodySection}>
          <TouchableOpacity>
            <Image
              source={require('../Images/DocImg.jpeg')}
              style={style.avatarImage}
            />
          </TouchableOpacity>

          <View style={style.namerow}>
            <Text style={style.nameText}>Sarthak Adhav</Text>
            <TouchableOpacity
              style={style.editIcon}
              onPress={() => Alert.alert('Edit Profile')}
            >
              <Feather
                name={"edit"}
                size={16}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* QR Section */}
        <View style={style.qrCodeSection}>
          <TouchableOpacity style={style.box}
            onPress={() => Alert.alert('View QR Code to edit')}
          >
            <FontAwesome6
              name="qrcode"
              size={28}
              color="#83B4FF" />
            <Text style={style.boxText}>Edit QR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={style.box}
            onPress={() => navigation.navigate('EmergencyContactScreen')}>
            <Ionicons
              name="call"
              size={28}
              color="#83B4FF" />
            <Text style={style.boxText}>Contacts</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => navigation.navigate('ChangePasswordScreen')}>
          <MaterialIcons
            name="edit"
            size={19}
            color="#000"
            style={{ marginLeft: 8 }}
          />
          <Text style={style.SettingsText}>Change Password</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => navigation.navigate('NotificationScreen')}>
          <MaterialIcons
            name="notifications"
            size={19}
            color="#000"
            style={{ marginLeft: 8 }}
          />
          <Text style={style.SettingsText}>Notification</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}>
          <MaterialIcons
            name="language"
            size={19}
            color="#000"
            style={{ marginLeft: 8 }}
          />
          <Text style={style.SettingsText}>Language</Text>
        </TouchableOpacity>
      </View> */}

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={style.settingsSection}
          onPress={() => Alert.alert('Contact Us information')}>
          <MaterialIcons
            name="mail"
            size={19}
            color="#000"
            style={{ marginLeft: 8 }}
          />
          <Text style={style.SettingsText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity
          style={style.settingsSection}
          onPress={() => setPrivacyVisible(true)}
        >
          <MaterialIcons
            name="privacy-tip"
            size={19}
            color="#000"
            style={{ marginLeft: 8 }}
          />
          <Text style={style.SettingsText}>Privacy Policy</Text>
        </TouchableOpacity>

        {/* Modal visible only when triggered */}
        <PrivacyPolicyModal
          visible={isPrivacyVisible}
          onClose={() => setPrivacyVisible(false)}
        />
      </View>


      <View style={{ paddingHorizontal: 10 }}>
        <TouchableOpacity style={[style.settingsSection, { justifyContent: 'center' }]}
          onPress={() => setLogoutVisible(true)}>
          <Text style={{ color: 'red', fontWeight: '500', fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>

        {/* Modal visible only when triggered */}
        <LogoutModal
          visible={isLogoutVisible}
          onClose={() => setLogoutVisible(false)}
        />
      </View>

      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
    </View>
  );
};

export default ProfileScreen;

const style = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  backIcon: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },

  // Wrapper for the card
  cardWrapper: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    // overflow: 'hidden',
    elevation: 1,
  },

  // BODY SECTION
  bodySection: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: '#1b47d2',
    // backgroundColor: '#eef6fa',
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

  // QR SECTION
  qrCodeSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
  },
  box: {
    backgroundColor: '#fff',
    // borderWidth: 0.2,
    width: "45%",
    marginBottom: 10,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  boxText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },

  // SETTINGS SECTION
  settingsSection: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    // borderWidth: 0.2,
    margin: 10,
    marginBottom: 0,
    elevation: 1,
  },
  SettingsText: {
    fontSize: 16,
    // fontWeight: '500',
    marginLeft: 10,
    color: '#000',
  },

});