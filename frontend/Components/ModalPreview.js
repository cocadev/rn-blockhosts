import React from "react";
import { StyleSheet, Text, Modal, View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AtomStaticCard from './AtomStaticCard'

export default function ModalPreview({onClose, data}) {

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
              <Text style={styles.t1}>Preview NFT</Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="window-close" size={24} color="black" />
              </TouchableOpacity>
            </View>

            <View style={{ height: 4}}/>

            <AtomStaticCard data={data} />

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