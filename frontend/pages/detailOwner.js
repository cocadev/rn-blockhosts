import React from "react";
import { useMoralisCloudFunction } from "react-moralis";
import { StyleSheet, ImageBackground, TouchableOpacity, View, Text, Image, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import ListNFT from "../Components/ListNFT";
import { useNFTBalance } from "../hooks/useNFTBalance";


const DetailOwner = ({ route, navigation }) => {

  const { NFTBalance } = useNFTBalance();
  const { colors } = useTheme();

  const { userId, username, user_avatar } = route.params;
  const { data } = useMoralisCloudFunction('loadUsers');
  const myInfo = data?.filter(item => item?.id === userId)
  const banner = myInfo && myInfo[0]?.attributes?.banner;
  const ethAddress = myInfo && myInfo[0]?.attributes?.ethAddress;
  const bio = myInfo && myInfo[0]?.attributes?.bio;

  return (
    <View style={[styles.container, { backgroundColor: colors.primary}]}>
      <ScrollView style={{width: '100%'}}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Icon name="md-arrow-back-sharp" size={25} color="#000" />
        </TouchableOpacity>
        <ImageBackground source={{uri: banner}} resizeMode="cover" style={styles.banner} />
        <View style={styles.center}>
          <Image
            style={styles.tinyLogo}
            source={{ uri:user_avatar}}
          />
        </View>

        <View style={{marginHorizontal: 12}}>
          <Text style={[styles.nameText, { color: colors.text}]}>{username}</Text>
          <Text style={[styles.addressText, { color: colors.text}]}>{ethAddress}</Text>
          <Text style={[styles.t1, { color: colors.color5}]}>{bio}</Text>
          <Text style={[styles.t2, { color: colors.text}]}>Member since 2022</Text>
          {
            NFTBalance.length > 0 && 
            <ListNFT 
              data={NFTBalance?.filter(item => item.metadata !== null && item?.owner_of === ethAddress)} 
              navigation={navigation}
            />}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  center: {
    alignItems: 'center'
  },
  iconBack: {
    position: 'absolute',
    left: 22,
    top: 22,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  },  
  tinyLogo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: -70,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#000'
  },
  banner: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    backgroundColor: '#000'
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: 8
  },
  addressText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2
  },
  t1: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 16,
    color: '#555'
  },
  t2: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 12
  },
  assetsViewer: {
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default DetailOwner;
