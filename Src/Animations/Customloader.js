import React from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const HeartLoader = ({ visible }) => {
    if (!visible) return null;  // hide when not needed

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.container}>
        <LottieView
          source={require('./Loader.json')}
          autoPlay
          loop
          style={{ width: 270, height: 270 }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
container: {
  position: 'absolute',
  top: 0, left: 0, right: 0, bottom: 0,
  justifyContent: 'center', alignItems: 'center',
  backgroundColor: 'transparent', // IMPORTANT
  zIndex: 9999,
}

});

export default HeartLoader;
