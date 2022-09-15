import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function CustomNavbar({navigation, title}) {

  return (
    <View style={styles.viewContainer}>
      <MaterialCommunityIcons name="wallet" size={28} color="#CACACA" />
      <MaterialCommunityIcons name="qrcode-scan" size={28} color="#CACACA" />
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <FontAwesome5 name="map-marked-alt" size={28} color="#CACACA" />
      <FontAwesome name="user" size={28} color="#CACACA" />
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 40,
    marginHorizontal: 10,
    marginVertical: 4,
    paddingHorizontal: 12,
    height: 60,
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    marginLeft: 12,
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20
  },
  logo: {
    width: 48,
    height: 48
  }
});