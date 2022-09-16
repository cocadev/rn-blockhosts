import React from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image, TextInput } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";

const screenWidth = Dimensions.get('window').width;

const ReceiveTokenScreen = ({ route, navigation }) => {

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'David Robinson'} />

        <Text style={styles.t1}>Receive Tokens</Text>

        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/qr.png')} style={styles.banner} />

          <Text style={styles.t1}>Scan address to recieve tokens</Text>

          <TextInput
            style={{ backgroundColor: '#fff', marginTop: 30, borderRadius: 11, paddingHorizontal: 12, paddingVertical: 7, minWidth: 250, textAlign: 'center' }}
            placeholder={'0xCC00.893493..b8E50'}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: '#116b5c' }]} >
            <Text style={{ color: '#fff', fontSize: 16 }}>Share</Text>
          </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBack: {
    position: 'absolute',
    left: 1,
    top: 22,
    zIndex: 100
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#000'
  },
  tinyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000'
  },
  banner: {
    width: screenWidth - 100,
    marginTop: 20,
    borderRadius: 25,
    height: screenWidth - 100,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: screenWidth - 24,
    marginTop: 60,
    borderRadius: 15,
    height: 280,
    alignItems: 'center',
    backgroundColor: '#000',
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
  t2: {
    marginTop: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 12,
  },
  t3: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '500',
    color: '#111',
    marginHorizontal: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },

  t4: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '700'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    height: 50,
    marginHorizontal: 2,
    backgroundColor: '#333'
  },
  box2: {
    marginHorizontal: 2,
    marginTop: 37,
    padding: 14,
    paddingVertical: 18,
    borderRadius: 18,
    elevation: 3
  },
  box3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 18,
    elevation: 3,
    marginHorizontal: 2,
  },
  t5: {
    fontSize: 22,
    fontWeight: '400'
  },
  t7: {
    color: '#888',
    fontSize: 16,
    fontWeight: '700'
  },
  t8: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 12
  },
  t9: {
    color: '#555',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 12,
    marginBottom: 5
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    width: 150,
    backgroundColor: '#22DBBB',
    borderRadius: 12,
    marginTop: 50,
    marginHorizontal: 30
  }
});

export default ReceiveTokenScreen;
