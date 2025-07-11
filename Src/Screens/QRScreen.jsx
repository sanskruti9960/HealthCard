import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";

import QRCode from 'react-native-qrcode-svg';
//*******************************************Work In Progress*****************************************************
const QRCodeScreen = () => {
  const userData = {
    name: "Sarthak Adhav",
    bloodGroup: "O+",
    emergencyContact: "+9100000000",
    allergies: "Girls",
  };

  const qrString = JSON.stringify(userData); // Convert to string

  return (
    <View style={style.Screen}>
      <View style={style.Header}>
        <TouchableOpacity style={style.backButton}>
          <Ionicons name="chevron-back" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 22, fontWeight: '600', color: '#000'
        }}>My QR Code</Text>
      </View>

      <Image
        source={require('../Images/QR.png')}
        style={style.image}
      />
      <View style={style.QRcard}>
        {/* <Text style={style.title}>My Emergency QR</Text> */}
        <QRCode value={qrString} size={230} />
      </View>

      <View style={style.btn}>
        <TouchableOpacity style={style.qrbtn}>
          <Text style={style.qrbtnText}>Download</Text>
          <Feather name="download"
            size={18}
            color="#fff"
            style={style.downloadIcon} />
        </TouchableOpacity>


        {/* <TouchableOpacity style={style.qrbtn}>
          <Text style={style.qrbtnText}>Edit QR</Text>
        </TouchableOpacity>  */}
      </View>
    </View>
  );
};

export default QRCodeScreen;

const style = StyleSheet.create({
  Screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  Header: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f2f2f2',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: '70%',
  },
  QRcard: {
    marginTop: 140,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '40%',
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    borderWidth: 2,
  },
  image: {
    position: 'absolute',
    top: 20,
    left: 40,
    width: 250,
    height: 190,
    borderRadius: 20,
    marginTop: 60,
  },
  btn: {
    marginTop: 15,
  },
  qrbtn: {
    backgroundColor: '#4a90e2',
    alignSelf: 'center',
    justifyContent:'space-around',
    width: 160,
    height: 50,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 2,
  },
  qrbtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  downloadIcon: {
    narginLeft: 10,
  }
});