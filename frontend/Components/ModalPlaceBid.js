import React from "react";
import { StyleSheet, Text, Modal, View, TouchableOpacity } from 'react-native';
import LinearButton from "./LinearButton";

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalPlaceBid({onClick, onClose}) {

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={styles.row}>
              <Text style={styles.t1}>Place a bid</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="window-close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View style={{ height: 4}}/>

            <Text style={styles.t2}>Your must bid at least 0.825 ETH</Text>

            <View style={{ height: 32}}/>

            <Text style={styles.t3}>Your bid</Text>

            <View style={styles.row}>
              <Text style={styles.t2}>Enter bid</Text>
              <Text style={styles.t3}>ETH</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.t2}>Your balance</Text>
              <Text style={styles.t3}>4.568 ETH</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.t2}>Service fee</Text>
              <Text style={styles.t3}>0.001 ETH</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.t2}>Total</Text>
              <Text style={styles.t3}>0.001 ETH</Text>
            </View>

            <View style={{ height: 12}}/>

            <LinearButton title='Place a bid' onClick={onClick}/>

            <View style={{ height: 12}}/>

          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  t1: {
    fontSize: 25,
    fontWeight: '700'
  },
  t2: {
    fontSize: 17,
    fontWeight: '400',
  },
  t3: {
    fontSize: 17,
    fontWeight: '700',
  },
});