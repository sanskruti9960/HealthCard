import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
  Share,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const qrRef = useRef();

  const userData = {
    name: "Sarthak Adhav",
    bloodGroup: "O+",
    emergencyContact: "+9100000000",
    allergies: "Girls",
  };
   const qrString = JSON.stringify(userData);
const qrLink = `https://myapp.com/userinfo?data=${encodeURIComponent(qrString)}`;



  const requestStoragePermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

const handleShareLink = async () => {
  try {
    const result = await Share.share({
      message: 'Emergency QR: https://your-dynamic-link.com/user-id', // Replace with actual dynamic link
    });

    if (result.action === Share.sharedAction) {
      console.log('Link shared!');
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    console.log('Error sharing link:', error);
  }
};


  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={style.Screen}>
      <View style={style.Header}>
        <TouchableOpacity style={style.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: '600', color: '#000' }}>My QR Code</Text>
      </View>

      {loading ? (
        <View style={style.loaderContainer}>
          <ActivityIndicator size="large" color="#1b47d2" />
          <Text style={{ marginTop: 10, color: '#555' }}>Generating QR...</Text>
        </View>
      ) : (
        <>
          <Text style={style.slogan}>Your Health, One Scan Away</Text>
          <View
            style={style.QRcard}
            collapsable={false}
            ref={qrRef}
          >
            <QRCode
              value={qrString}
              size={200}
              color="#1b47d2"
              backgroundColor="#FFFFFF"
            />
          </View>

          <View style={style.btnContainer}>
            <TouchableOpacity style={style.qrBtn} onPress={handleShareLink}>
              <Text style={style.qrBtnText}>Share QR</Text>
              <Feather name="share-2" size={18} color="#fff" style={style.icon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default QRCodeScreen;

const style = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: '70%',
  },
  QRcard: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '40%',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: 2,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  qrBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1b47d2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    elevation: 4,
  },
  qrBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  icon: {
    marginRight: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slogan: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#1b47d2',
    marginTop: 40,
  },
});
