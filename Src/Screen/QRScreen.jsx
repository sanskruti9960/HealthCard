import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Share,
} from 'react-native';
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import QRCode from 'react-native-qrcode-svg';

const QRCodeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [userDoc, setUserDoc] = useState('');
  const qrRef = useRef();
 const uid = "Rn1hkEFgXpfzInVvZSYp8jDg2Lg1"
  useEffect(() => {
  if (userDoc) {
    console.log("QR Data:", userDoc);
  }
}, [userDoc]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        // const uid = auth().currentUser.uid; // Current user ID
        const doc = await firestore().collection('userData').doc(uid).get();
        if (doc.exists) {
          setUserDoc(doc.data());
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      const qrString = JSON.stringify(userDoc); // Store Firestore data
      const qrLink = `https://health-card-1-git-healthweb-palaks-projects-ef7075f5.vercel.app?data=${encodeURIComponent(qrString)}`;

      await Share.share({
        message: `Emergency QR: ${qrLink}`,
      });
    } catch (error) {
      console.log('Error sharing link:', error);
    }
  };

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
          <Text style={{ marginTop: 10, color: '#555' }}>Loading QR...</Text>
        </View>
      ) : (
        <>
          <Text style={style.slogan}>Your Health, One Scan Away</Text>
         <View style={style.QRcard}>
  {userDoc ? (
    <QRCode
      value={JSON.stringify(userDoc)}
      size={200}
      color="#4D94CC"
      backgroundColor="#FFFFFF"
      getRef={(c) => (qrRef.current = c)} // optional if you want to save/share image
    />
  ) : (
    <Text style={{ color: '#999', textAlign: 'center' }}>No data available</Text>
  )}
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
  Screen: { flex: 1, backgroundColor: '#fff' },
  Header: { justifyContent: 'center', alignItems: 'center', paddingVertical: 20, backgroundColor: '#fff' },
  backButton: { position: 'absolute', left: 20, top: '70%' },
  QRcard: { marginTop: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', width: '80%', height: '40%', backgroundColor: '#fff', borderRadius: 50, borderWidth: 2 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginTop: 30 },
  qrBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1C75BC', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 12, elevation: 4 },
  qrBtnText: { color: '#fff', fontSize: 16, fontWeight: '600', marginRight: 8 },
  icon: { marginRight: 4 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  slogan: { textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#4D94CC', marginTop: 40 },
});
