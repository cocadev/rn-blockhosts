import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DEMO_AVATAR } from "../config/keys";
import UtilService from "../utils/utilService";

export default function AtomStaticCard({ data }) {

  const { image, price, title, chain } = data;

  return (
    <View style={styles.itemContainer}>

      <Image
        source={{ uri: image }}
        style={styles.logo}
      />

      <View style={styles.view}>

        <View style={styles.row}>
          <Image source={{ uri: DEMO_AVATAR }} style={styles.avatar} />
          <View style={{ marginLeft: 6, flex: 1 }}>
            <Text style={styles.name}> {title}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[styles.name, { fontWeight: '400', color: '#555', fontSize: 14 }]}> {price || 0}</Text>
              <Image source={{ uri: UtilService.CurrencyIcon(chain) }} style={{ width: 24, height: 24, marginLeft: 3 }} />
            </View>
          </View>
          {/* <Icon name={ "heart-o"} size={24} color={"#888"} /> */}
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 3,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  logo: {
    height: 300,
    borderRadius: 20,
    backgroundColor: '#223',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  name: {
    fontSize: 18,
    color: "#414a4c",
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    color: "#222",
    fontWeight: "700",
    lineHeight: 32,
    marginTop: 5
  },
  view: {
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
});
