import React, { useState } from "react";
import { useMoralis, useMoralisCloudFunction, useMoralisWeb3Api, } from "react-moralis";
import { FlatList, StyleSheet, View } from "react-native";
import { DEMO_AVATAR } from "../config/keys";
import AtomNFTCard from "./AtomNFTCard";
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "react-native-paper";
import { onGetData } from "../store/actions/nfts/nfts";
import { useGetChainId } from "../hooks/useGetChainId";
import { useDispatch } from "react-redux";

export default function ListNFT({ data, navigation, social, hidden }) {

  const [type, setType] = useState(0);
  const { data: users } = useMoralisCloudFunction('loadUsers')
  const { colors } = useTheme();
  const { Moralis } = useMoralis();
  const { chainId } = useGetChainId();
  const Web3Api = useMoralisWeb3Api();
  const dispatch = useDispatch();

  const onLoadNFTs = () => {
    const LazyMints = Moralis.Object.extend("LazyMints");
    const query = new Moralis.Query(LazyMints).limit(5000);
    dispatch(onGetData(query, chainId, Web3Api))
  }

  const renderItem = ({ item, index }) => {

    const { image, name, chain, isVideo } = JSON.parse(item.metadata)
    const me = users?.find(z => (z?.attributes?.accounts && z?.attributes?.accounts[0]) === item.owner_of)
    const username = me?.attributes?.username || 'Unnamed';
    const userId = me?.id;
    const user_avatar = me?.attributes?.avatar || DEMO_AVATAR;
    const myData = { image, name, username, userId, user_avatar, chain, isVideo };

    return (
      <AtomNFTCard
        key={index}
        data={myData}
        navigation={navigation}
        metadata={JSON.parse(item.metadata)}
        type={type}
        nftId={item.token_id}
        supply={item.contract_type === "ERC1155" ? item.amount : 0}
        item={item}
      />
    );
  };

  return (
    <View>

      {!hidden && <View style={styles.row}>
        <TouchableOpacity onPress={() => setType(0)} style={type === 0 ? styles.icon2 : styles.icon}>
          <Feather name="square" size={23} color={type === 0 ? '#fff' : "#666"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setType(1)} style={type === 1 ? styles.icon2 : styles.icon}>
          <FontAwesome name="minus-square-o" size={23} color={type === 1 ? '#fff' : "#666"} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onLoadNFTs} style={styles.icon}>
          <Feather name="refresh-ccw" size={23} color={type === 1 ? '#fff' : "#666"} />
        </TouchableOpacity>

      </View>}

      <FlatList
        style={[styles.assetsViewer, { backgroundColor: colors.primary }]}
        scrollEnabled={true}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 16,
    alignContent: 'center',
    justifyContent: 'center'
  },
  assetsViewer: {
    borderRadius: 10,
  },
  icon: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon2: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#7711fc',
    backgroundColor: '#7711fc',
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
});