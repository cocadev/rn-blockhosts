import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';

export default function CustomNavbar() {

  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('Marketplace')}>
        <MaterialCommunityIcons name="wallet" size={28} color={route.name === 'Marketplace' ? '#22DBBB' : "#CACACA"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Share')}>
        <MaterialCommunityIcons name="qrcode-scan" size={28} color={(route.name === 'Share' || route.name === 'ReceiveToken') ? '#22DBBB' : "#CACACA"}/>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('MyToken')}>
        <FontAwesome5 name="map-marked-alt" size={28} color={route.name === 'MyToken' ? '#22DBBB' : "#CACACA"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
        <FontAwesome name="user" size={28} color={route.name === 'EditProfile' ? '#22DBBB' : "#CACACA"} />
      </TouchableOpacity>

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
    marginVertical: 8,
    paddingHorizontal: 12,
    height: 60,
    marginLeft: 12,
  },
  logo: {
    width: 48,
    height: 48
  }
});