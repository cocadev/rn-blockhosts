import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ModalPlaceBid from "../../Components/ModalPlaceBid";
import { useTheme } from "react-native-paper";
import { Video } from "expo-av";
import { DEMO_AVATAR } from "../../config/keys";
import DescriptionDetail from './descriptionDetail';
import { useMoralisQuery } from "react-moralis";
import { useSelector } from "react-redux";
import SellButton from './sellButton';

const screenWidth = Dimensions.get('window').width;

const DetailNFT = ({ route, navigation }) => {

  const { metadata, username, user_avatar, owner_of, token_id } = route.params;
  const { image, name, description, price, isVideo } = metadata;
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.f00 }]}>

      <ScrollView style={{ paddingHorizontal: 12 }}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Icon name="left" size={25} color={colors.color2} />
        </TouchableOpacity>

        <Image source={{ uri: image }} style={styles.banner} />

        <View >
          <Text style={[styles.t1, { color: colors.color2 }]}>{name}</Text>
          <Text style={[styles.t2, { color: colors.color2 }]}>
            The standard Lorem Ipsum passage, used since the 1500s

            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#727375'}]} >
          <Text style={{ color: '#fff', fontSize: 16 }}>Share</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={{ color: '#fff', fontSize: 16 }}>Buy Token</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // marginTop: StatusBar.currentHeight || 0,
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
    width: screenWidth - 24,
    marginTop: 60,
    borderRadius: 15,
    height: 380,
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
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: 5
  },
  t2: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500'
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
    height: 60,
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
    paddingVertical: 20,
    minWidth: 250,
    backgroundColor: '#22DBBB',
    borderRadius: 12,
    marginTop: 20,
    marginHorizontal: 30
  }
});

export default DetailNFT;
