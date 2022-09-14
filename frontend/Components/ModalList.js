import React from "react";
import { StyleSheet, Text, Modal, View, Pressable } from 'react-native';
import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearButton from "./LinearButton";

export default function ModalList({ title, onClose, onCheckItem, category, data, onGoBtn }) {

  const { colors } = useTheme();
  const isBrandCollection = (title === 'brand' || title === 'collection')

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView]}>
        <View style={[styles.modalView]}>

          <View style={styles.row}>
            <Text style={[styles.t1, { color: colors.text }]}>{(isBrandCollection ? "Choose the " : "") + title}</Text>
            <Pressable onPress={onClose}>
              <Icon name="window-close" size={24} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.center}>
            {
              data.map((item, index) =>
                <Pressable
                  key={index}
                  style={[styles.box, { borderColor: category !== item.value ? 'transparent' : 'green', backgroundColor: colors.primary3 }]}
                  onPress={() => {
                    onClose();
                    onCheckItem(item);
                  }}
                >
                  <Text style={{ color: colors.text }}>{item.label}</Text>
                </Pressable>)
            }

            <View style={{ alignItems: 'center' }}>
              {data.length === 0 && <Text style={{ color: 'red' }}>
                You don't have any {title}s yet. please create new {title}.
              </Text>}

              {isBrandCollection && <LinearButton
                title={'Create new ' + title}
                onClick={() => {
                  onClose();
                  onGoBtn();
                }}
              />}

            </View>
          </View>

          <View style={{ height: 12 }} />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  modalView: {
    backgroundColor: '#222',
    margin: 20,
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
    fontSize: 23,
    fontWeight: '700'
  },
  box: {
    backgroundColor: '#f0f0f0',
    marginTop: 7,
    padding: 9,
    paddingHorizontal: 12,
    width: '100%',
    borderWidth: 2
  },
  linkText: {
    color: 'red',
  }
});