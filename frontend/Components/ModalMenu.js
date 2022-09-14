import React from "react";
import { StyleSheet, Text, Modal, Image, View, TouchableOpacity, useColorScheme, Appearance } from 'react-native';
import LinearButton from "./LinearButton";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMoralis } from "react-moralis";
import { useTheme } from "react-native-paper";

export default function ModalMenu({onClose, navigation}) {

  const { isAuthenticated } = useMoralis();
  const { colors } = useTheme();
  const scheme = useColorScheme();

  const onNavigate = (e) => {
    onClose();
    navigation.navigate(e)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, { backgroundColor: colors.primary}]}>

        <View style={styles.viewContainer}>
          <Image source={scheme !== 'light' ? require('../black-logo.png') : require('../moralis-logo.png')} style={styles.logo}/>
          <View style={styles.right}>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={30} color={colors.color6} />
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.modalView}>

          {/* <Text style={[styles.t1, { color: colors.text}]}>About MetaSalt</Text> */}

          <TouchableOpacity onPress={()=>onNavigate('Home')}>
            <Text style={[styles.t1, { color: colors.text}]}>Home </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>onNavigate('Collections')}>
            <Text style={[styles.t1, { color: colors.text}]}>Mint </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={()=>onNavigate('Explore')}>
            <Text style={[styles.t1, { color: colors.text}]}>Market </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>onNavigate('Social')}>
            <Text style={[styles.t1, { color: colors.text}]}>Gates </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={()=>onNavigate('FAQ')}>
            <Text style={[styles.t1, { color: colors.text}]}>FAQ </Text>
          </TouchableOpacity> */}

          {isAuthenticated && <TouchableOpacity onPress={()=>onNavigate('Profile')}>
            <Text style={[styles.t1, { color: colors.text}]}>Profile </Text>
          </TouchableOpacity>}

        </View>

        {!isAuthenticated && <View style={{ marginHorizontal: 30, marginTop: 40}}>
          <LinearButton title='Connect Wallet' onClick={()=>onNavigate('Auth')} />
        </View>}

        <View style={{ height: 20}}/>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    padding: 15,
    alignItems: 'center',
    marginTop: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 40,
    lineHeight: 70,
    fontWeight: '700'
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    paddingHorizontal: 12,
  },
  logo: {
    height: 20,
    width: 200
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  }
});
