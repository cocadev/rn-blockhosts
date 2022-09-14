import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import UtilService from "../../utils/utilService";

const DescriptionDetail = ({ data, minter }) => {

  const { colors } = useTheme();
  const { token_address, contract_type, token_id, metadata, supply, owner_of } = data;
  const { chain, brand, category } = metadata;
  const { nfts1155 } = useSelector(state => state.nfts)

  const erc1155Data = nfts1155.filter(item => (item.token_id === token_id) && (item.owner_of !== minter?.account));
  const totalSale = erc1155Data.reduce((s, f) => s + Number(f.amount), 0);

  return (
    <View style={[styles.container, { backgroundColor: colors.f00 }]}>
      <View style={styles.box}>
        <Text style={styles.text}>Contract Address</Text>
        <Text style={styles.text}>{token_address.substr(0, 9) + '...' + token_address.substr(-4)}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Token ID </Text>
        <Text style={styles.text}>{token_id.substr(0, 9) + '...' + token_id.substr(-4)}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Token Standard </Text>
        <Text style={styles.text}>{contract_type}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>BlockChain </Text>
        <Text style={styles.text}>{UtilService.getChain(chain)}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Brand </Text>
        <Text style={styles.text}>{brand?.label || '-'}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Collection </Text>
        <Text style={styles.text}>{category?.label || '-'}</Text>
      </View>
      {contract_type === 'ERC1155' && <View style={styles.box}>
        <Text style={styles.text}>Total Supply </Text>
        <Text style={styles.text}>{supply}</Text>
      </View>}
      {contract_type === 'ERC1155' && <View style={styles.box}>
        <Text style={styles.text}>Total Sold </Text>
        <Text style={styles.text}>{totalSale}</Text>
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    height: 40,
    marginHorizontal: 2,
    backgroundColor: '#333'
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    color: "#fff"
  },
});

export default DescriptionDetail;
