import React, { useState } from "react";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image, Linking, Alert } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import LinearButton from "../Components/LinearButton";
import { useTheme } from "react-native-paper";
import { useMoralis } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useSelector } from "react-redux";
import _ from 'underscore';
import { useToast } from "react-native-toast-notifications";
import { Video } from "expo-av";

const screenWidth = Dimensions.get('window').width;

const DetailGate = ({ route, navigation }) => {

  const { isAuthenticated } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  const { nfts, nfts1155 } = useSelector(state => state.nfts)
  const toast = useToast();

  const { brand, title, globalNFT, collection, image, userId, user_avatar, username, nfts: dataNFTs, contents } = route.params;

  const { colors } = useTheme();
  const NFTBalance = [...nfts, ...nfts1155];

  const [reveal, setReveal] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isValidImg, setIsValidImg] = useState([]);

  const myNFTs = NFTBalance?.filter(item => item.owner_of?.toLowerCase() === walletAddress)

  const MyNFTBalances = myNFTs; //temporarily

  const onEnterGate = async () => {

    if (!isAuthenticated) {
      navigation.navigate('Auth');
      return false;
    }

    if (myNFTs.length > 0) {

      console.log('* globalNFT *', globalNFT)

      const possessNFTIds = MyNFTBalances?.map(item => item.token_address + "-" + item.token_id)
      const gatedNFTIds = globalNFT?.map(item => item.token_address + "-" + item.token_id)
      const metasaltIds = myNFTs.map(item => item.token_id)

      let isVisible = false
      await possessNFTIds?.map((item) => {
        if (gatedNFTIds.includes(item)) {
          isVisible = true;
        }
        const dupli = _.intersection(metasaltIds, dataNFTs)
        if (dupli.length > 0) {
          isVisible = true;
        }
      })

      console.log('***** isVisible *****', isVisible)

      if (isVisible) {

        console.log('***** contents *****', contents)

        if (contents?.length === 1) {
          const url = contents[0].link;
          const isMyVideo = contents[0].type.value === 'video';
          if (isMyVideo) {
            navigation.navigate("VideoDetail", {
              uri: url,
              title: contents[0].title
            })
            return false;
          }

          const supported = await Linking.canOpenURL(url);
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            toast.show(`Don't know how to open this URL: ${url}`);
          }
        } else {
          setReveal(true);
        }
      } else {
        toast.show("You don\'t have the NFTs needed to access this content.");
      }
    } else {
      if (!walletAddress) {
        toast.show("Unauthorized! You are not logged in the website!");
      }
    }
  }

  const onLink = async (item) => {
    const isMyVideo = item.type.value === "video";
    if (isMyVideo) {
      navigation.navigate("VideoDetail", {
        uri: item.link,
        title: item.title
      })
      return false;
    }

    const supported = await Linking.canOpenURL(item.link);
    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(item.link);
    } else {
      toast.show(`Don't know how to open this URL: ${item.link}`);
    }
  }

  const onErrorVideo = (e, pp) => {
    if (e) {
      setIsValidImg(isValidImg.concat(pp));
    } else {
      return null
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.f00 }]}>

      <ScrollView style={{ paddingHorizontal: 12 }}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Icon name="left" size={25} color={colors.color2} />
          <Text style={[styles.t3, { color: colors.color2 }]}>{title}</Text>
        </TouchableOpacity>

        <Image source={{ uri: image }} style={styles.banner} />

        <View style={styles.row}>
          <Text style={[styles.nameText, { maxWidth: 260 }]}>
            <Text style={{ color: '#bbb' }}>Created by</Text>
            &nbsp;&nbsp;{username}</Text>
          <TouchableOpacity onPress={() => {
            navigation.navigate("NFTOwner", {
              userId,
              username,
              user_avatar,
            })
          }}>
            <Image
              style={styles.tinyLogo}
              source={{ uri: user_avatar }}
            />
          </TouchableOpacity>

        </View>

        <View style={styles.note}>
          <Image
            style={styles.tinyAvatar}
            source={{ uri: brand?.attributes?.avatar }}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>Brand</Text>
            <Text style={{ color: '#999' }}>{brand?.attributes?.title || '-'}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.note}
          onPress={() => navigation.navigate("CollectionDetail", {
            collectionId: collection?.id,
          })}
        >
          <Image
            style={styles.tinyAvatar}
            source={{ uri: collection?.attributes?.avatar }}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={{ color: '#fff', fontSize: 20 }}>Collection</Text>
            <Text style={{ color: '#999' }}>{collection?.attributes?.title || '-'}</Text>
          </View>
        </TouchableOpacity>

        <Text style={[styles.t5, { margin: 12, marginTop: 32, color: colors.color3 }]}>NFTs</Text>

        <View style={styles.content}>
          {
            dataNFTs.map((item, index) => {
              const nftObject = NFTBalance?.find(x => x.token_id === item);
              if (!nftObject) return false;
              const metadata = JSON.parse(nftObject.metadata);
              return (
                <View key={index} style={styles.nftItem}>
                  <View style={{ height: 120 }} className='d-center'>
                    <Image
                      source={{ uri: metadata.image }}
                      alt="nft"
                      style={{ width: 140, height: 120 }}
                    />
                  </View>
                  <Text style={{ color: '#bbb', textAlign: 'center' }}>{metadata.name}</Text>
                </View>)
            })
          }

          {
            (globalNFT)?.length > 0 &&
            (globalNFT)?.map((item, index) => {
              if (!item.metadata) return false;
              const metadata = JSON.parse(item.metadata);
              let image = metadata.image;
              if (image.substring(0, 4) === 'ipfs') {
                image = 'https://ipfs.moralis.io:2053/ipfs/' + image.substring(7)
              }
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.nftItem}
                  onPress={()=>Linking.openURL('https://etherscan.io/address/' + item.token_address)}
                >
                  <View style={{ height: 120 }} className='d-center'>
                    {isValidImg.includes(index) && <Image
                      source={{ uri: image }}
                      alt="nft"
                      style={{ width: 140, height: 120 }}
                    />}
                    {!isValidImg.includes(index) && <Video
                      source={{ uri: image }}
                      rate={1.0}
                      volume={0}
                      isMuted={true}
                      resizeMode="cover"
                      shouldPlay
                      isLooping
                      style={styles.video}
                      onError={e => onErrorVideo(e, index)}
                    />}
                  </View>
                  <Text style={{ color: '#bbb', textAlign: 'center' }}>{metadata.name}</Text>
                </TouchableOpacity>)
            })
          }
        </View>

        {!reveal && nfts.length > 0 && <View>
          <LinearButton title='Enter' onClick={() => onEnterGate()} />
          {isError && <Text style={{ color: 'red' }}>Unauthorized. You don't have the NFTs needed to access this content.</Text>}
        </View>}

        {reveal && <View>
          <Text style={[styles.t5, { margin: 12, marginTop: 32, color: colors.color3 }]}>Contents</Text>

          <View>
            {
              contents?.map((item, index) => {
                return (
                  <TouchableOpacity style={styles.note} key={index} onPress={() => onLink(item)}>
                    {item.type.label === "Discord" && <FontAwesome5 name={'discord'} size={24} color="#bbb" />}
                    {item.type.label === "Link" && <Icon name={'link'} size={24} color="#bbb" />}
                    {item.type.label === "YouTube" && <Icon name={'youtube'} size={24} color="#bbb" />}
                    {item.type.label === "QR Code" && <Icon name={'qrcode'} size={24} color="#bbb" />}
                    {item.type.value === "video" && <FontAwesome5 name={'file-video'} size={24} color="#bbb" />}
                    <Text style={styles.contentText}>{item.type.value === "video" ? item.title : item.link}</Text>
                  </TouchableOpacity>
                )
              })}
          </View>
        </View>}

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#fff' }}>Go Back</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 20 }} />

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  iconBack: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#000',
    marginLeft: 6
  },
  tinyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000'
  },
  banner: {
    width: screenWidth - 24,
    marginTop: 20,
    borderRadius: 15,
    height: 320,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#e5e510',
    marginLeft: 3,
  },
  t3: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
    height: 40,
    maxWidth: 300,
  },
  t5: {
    fontSize: 22,
    fontWeight: '400'
  },
  note: {
    backgroundColor: '#333',
    marginTop: 12,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row'
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  nftItem: {
    backgroundColor: '#333',
    padding: 6,
    borderRadius: 6,
    margin: 6,
    width: screenWidth / 2 - 28
  },
  contentText: {
    color: '#bbb',
    marginLeft: 8,
    maxWidth: screenWidth - 80
  },
  btn: {
    backgroundColor: '#e61632',
    width: 100,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  video: {
    height: 120,
    width: 140,
    borderRadius: 12,
    backgroundColor: '#223',
  }
});

export default DetailGate;
