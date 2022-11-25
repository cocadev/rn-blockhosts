import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image, TextInput } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

const MapScreen = ({ route, navigation }) => {

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        {/* <CustomHeader navigation={navigation} title={''} /> */}

        <Text style={styles.t1}>Choose a Venue</Text>

        <View style={styles.container}>
        <MapView
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  />
        </View>

        <View style={{ height: 20 }} />

      </ScrollView>

      <CustomNavbar />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#2ddbbb'
  },
  t1: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: 25,
    textAlign: 'center',
    color: '#111'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300
  },
});

export default MapScreen;
