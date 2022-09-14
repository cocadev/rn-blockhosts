import { Video } from "expo-av";
import React, { useState } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useTheme } from "react-native-paper";
import UtilService from "../utils/utilService";

export default function AtomNFTCard({navigation, data, metadata, type, nftId, supply, item}) {

  const { colors } = useTheme();
  const { user } = useMoralis();
  const [trigger, setTrigger] = useState(1);
  const { data: likes } = useMoralisQuery("TestLikes", query => query.equalTo("userId", user?.id), [trigger], { autoFetch: true });
  const likesData = likes?.map(item => { return item.attributes.nftId });
  const isLiked = likesData.includes(nftId);
  const { image, name, username, userId, user_avatar, chain, isVideo } = data;

  const onGoNFT = () => {
    navigation.navigate("NFTDetail", {
      metadata,
      username, user_avatar, isLiked,
      contract_type: item.contract_type,
      lazyMint: item.lazyMint,
      owner_of: item.owner_of,
      privateSale: item.privateSale,
      royaltyFee: item.royaltyFee,
      supply: item.supply,
      token_address: item.token_address,
      token_id: item.token_id,
    })
  }

  const onGoOwner = () => {
    navigation.navigate("NFTOwner", {
      userId,
      username,
      user_avatar,
    })
  }

  return (
    <View style={[styles.itemContainer, { flexDirection: type === 1 ? 'row' : 'column', backgroundColor: colors.primary3}]}>
      <TouchableOpacity onPress={onGoNFT}>
        {!isVideo && <Image
          source={{ uri: image }}
          style={type === 1 ? styles.logo : styles.logo2}
        />}
        {isVideo && <Video
          source={{ uri: image }}
          rate={1.0}
          volume={0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={type === 1 ? styles.logo : styles.logo2}
        />}
      </TouchableOpacity>

      <View style={styles.view}>
        <Text style={[styles.title, { color: colors.color2}]} numberOfLines={1}>{name}- {isVideo ? 'Video' : 'Image'}</Text>
        <Text style={styles.erc1155}>{supply || ''}</Text>

        <View style={styles.tt}>
          <TouchableOpacity onPress={onGoOwner}>
            <Image source={{ uri: user_avatar }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={{ marginLeft: 6, flex: 1 }}>
            <Text style={[styles.name, { color: colors.color4}]} numberOfLines={1}> {username || ''}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
              <Image source={{ uri: UtilService.CurrencyIcon(chain)}} style={{ width: 30, height: 30}}/>
              <Text style={[styles.name, { fontWeight: '400', color: colors.color5, fontSize: 14 }]}> {metadata?.price || 0 } </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    marginHorizontal: 3,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    alignItems: 'center'
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 20,
    backgroundColor: '#223',
  },
  logo2: {
    height: 300,
    width: 300,
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
    fontWeight: "700",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    marginTop: 5
  },
  view: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  tt: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  }, 
  ercText:{
    color: '#fff',
    position: 'absolute',
    left: 0
  },
  erc1155: {
    position: 'absolute',
    color: '#75b314',
    fontWeight: '700',
    right: 0,
    top: 0
  }
});
