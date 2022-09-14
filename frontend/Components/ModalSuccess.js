import React from "react";
import { StyleSheet, Text, Modal, Image, View, Pressable } from 'react-native';
import LinearButton from "./LinearButton";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ModalSuccess({onClose, onClick, title, description}) {

  return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {}}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View style={styles.row}>
              <Text style={styles.t1}>{title}</Text>
              <Pressable onPress={onClose}>
                <Icon name="window-close" size={24} color="black" />
              </Pressable>
            </View>

            <View style={styles.center}>
              <Image source={require('../../assets/image/Emoji.png')} />
            </View>

            <Text style={styles.t2}>{description}</Text>

            <View style={{ height: 12}}/>

            <LinearButton title='Back to home' onClick={onClick}/>

          </View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 25,
    fontWeight: '700'
  },
  t2: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20
  },
  t3: {
    fontSize: 16,
    fontWeight: '700'
  }
});
