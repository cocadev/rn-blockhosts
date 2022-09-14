import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ModalPlaceBid from "../../Components/ModalPlaceBid";
import { useTheme } from "react-native-paper";
import { Video } from "expo-av";
import { DEMO_AVATAR } from "../../config/keys";
import TimeAgo from 'react-native-timeago';
import LinearButton from "../../Components/LinearButton";
import DescriptionDetail from './descriptionDetail';
import { useMoralisQuery } from "react-moralis";
import { useSelector } from "react-redux";
import SellButton from './sellButton';

const screenWidth = Dimensions.get('window').width;

const DetailNFT = ({ route, navigation }) => {

  const { metadata, username, user_avatar, owner_of, token_id } = route.params;
  const { image, name, description, price, isVideo } = metadata;
  const [bidModal, setBidModal] = useState(false);
  const { colors } = useTheme();
  const { users } = useSelector(state => state.users)
  const { data: minterPricedata } = useMoralisQuery("OrderData", query => query.equalTo("tokenId", token_id).ascending("createdAt"));

  const [changedPrice, setChangedPrice] = useState();

  const minterAddress = minterPricedata.length > 0 ? (minterPricedata[0]?.attributes?.maker) : (owner_of || null);
  const minter = minterAddress ? users?.find(z => (z.account) === minterAddress) : null;

  return (
    <View style={[styles.container, { backgroundColor: colors.f00 }]}>

      <ScrollView style={{ paddingHorizontal: 12 }}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Icon name="left" size={25} color={colors.color2} />
        </TouchableOpacity>

        {!isVideo ? <Image source={{ uri: image }} style={styles.banner} />
          : <Video
            source={{ uri: image }}
            rate={1.0}
            volume={0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping
            style={styles.video}
          />}

        <View style={[styles.row, { justifyContent: 'space-between', margin: 12 }]}>
          <Text style={[styles.t3, { color: colors.color2 }]}>{name}</Text>
        </View>

        <View style={styles.row}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: user_avatar }}
          />
          <Text style={[styles.nameText, { color: colors.text }]}>&nbsp;&nbsp;{username}</Text>
        </View>

        <Text style={[styles.t2, { color: colors.color5 }]}>
          {description?.replace('<p>', '')?.replace('</p>', '')}
        </Text>

        <DescriptionDetail data={route.params} minter={minter}/>

        <View style={[styles.box2, { backgroundColor: colors.primary3 }]}>
          <View style={styles.row}>
            <Text style={[styles.t3, { color: colors.color2 }]}>{price} ETH</Text>
            <Text style={styles.t7}>&nbsp;&nbsp;${price * 4300}</Text>
          </View>
          <View style={{ height: 20 }} />
          <SellButton data={route.params} {...{ changedPrice, setChangedPrice, minter}} />
        </View>

        <Text style={[styles.t5, { margin: 12, marginTop: 32, marginBottom: 0, color: colors.color3 }]}>Activity</Text>

        <View style={[styles.box3, { backgroundColor: colors.primary3 }]}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Image source={{ uri: user_avatar }} style={styles.tinyAvatar} />
            <View>
              <Text style={[styles.t4, { color: colors.color2 }]}>Bid place by @pawel09</Text>
              <Text style={styles.t9}>June 06, 2021 at 12:00am</Text>
              <View style={styles.row}>
                <Text style={[styles.t4, { color: colors.color2 }]}>1.00 ETH</Text>
                <Text style={[styles.t7, { fontSize: 13 }]}>&nbsp;$2,683.73</Text>
              </View>
            </View>
          </View>
          <Feather name="external-link" size={24} color={colors.color5} />
        </View>

        <View style={[styles.box3, { backgroundColor: colors.primary3 }]}>
          <View style={[styles.row, { alignItems: 'flex-start' }]}>
            <Image source={{ uri: DEMO_AVATAR }} style={styles.tinyAvatar} />
            <View>
              <Text style={[styles.t4, { color: colors.color2 }]}>Created NFT by minter</Text>
              <Text style={styles.t9}>June 06, 2021 at 12:00am</Text>
              <View style={styles.row}>
                <Text style={[styles.t4, { color: colors.color2 }]}>1.00 ETH</Text>
                <Text style={[styles.t7, { fontSize: 13 }]}>&nbsp;$2,683.73</Text>
              </View>
            </View>
          </View>
          <Feather name="external-link" size={24} color={colors.color5} />
        </View>

        <View style={{ height: 20 }} />

        {
          bidModal &&
          <ModalPlaceBid onClose={() => setBidModal(false)} />
        }

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
  t2: {
    fontSize: 13,
    fontWeight: '500',
    marginHorizontal: 4,
    marginTop: 5
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  t3: {
    fontSize: 24,
    fontWeight: '700'
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
});

export default DetailNFT;
