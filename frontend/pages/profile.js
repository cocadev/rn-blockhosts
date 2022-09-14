import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, View, Text, Button, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import LinearButton from "../Components/LinearButton";
import Icon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ModalCamera from '../Components/ModalCamera';
import ModalSuccess from "../Components/ModalSuccess";
import Loading from "../Components/loading";
import { useTheme } from "react-native-paper";

const TabProfile = ({ navigation }) => {

  const { isAuthenticated, logout, setUserData, Moralis } = useMoralis();
  const { walletAddress, chainId } = useMoralisDapp();
  const [title, onChangeTitle] = useState();
  const [email, onChangeEmail] = useState();
  const [bio, onChangeBio] = useState();
  const { colors } = useTheme();

  const [isPicker, setIsPicker] = useState(0);
  const [fileBanner, setFileBanner] = useState();
  const [fileAvatar, setFileAvatar] = useState();
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data } = useMoralisCloudFunction('loadUsers');
  const myInfos = data?.filter(item => item?.attributes?.ethAddress === walletAddress);
  const myInfo = myInfos && myInfos[0];

  useEffect(() => {
    if(myInfo){
      onChangeTitle(myInfo?.attributes?.username)
      onChangeEmail(myInfo?.attributes?.email)
      onChangeBio(myInfo?.attributes?.bio)
      setFileAvatar(myInfo?.attributes?.avatar)
      setFileBanner(myInfo?.attributes?.banner)
    }
  } , [myInfo])

  const onSaveProfile = async () => {

    setIsLoading(true);
    const avatar = await uploadImage(fileAvatar);
    const banner = await uploadImage(fileBanner);
    let request = {
      username: title,
      bio,
      email,
    }
    if(fileAvatar){
      request.avatar = avatar
    }

    if(fileBanner){
      request.banner = banner
    }

    await setUserData(request).then(() => {
      setIsLoading(false);
      setIsSuccessModal(true);
    }, (error) => {  
      setIsLoading(false);
    });
  }

  const logoutUser = () => {
    if (isAuthenticated) {
      logout();
      navigation.navigate('Home')
    }
  };

  const takePicture = async (number) => {

    let res = await Permissions.askAsync(Permissions.CAMERA)
    if (res.status === 'granted') {
      let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status === 'granted') {
        let image = await ImagePicker.launchCameraAsync({
          quality: 0.6,
          base64: true,
          aspect: [4, number === 1 ? 1 : 4],
          quality: 1,
          allowsEditing: true
        })

        if (image.base64) {
          if(number === 1){
            setFileBanner(`data:image/jpg;base64,${image.base64}`);
          }else{
            setFileAvatar(`data:image/jpg;base64,${image.base64}`);
          }
        }
      }
    }
  }

  const pickImage = async (number) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (result.base64) {
      if(number === 1){
        setFileBanner(`data:image/jpg;base64,${result.base64}`);
      }else{
        setFileAvatar(`data:image/jpg;base64,${result.base64}`);
      }
    }
  };

  const uploadImage = async (myFile) => {
    const nowTime = new Date().getTime();
    var nftImageFile = new Moralis.File(nowTime, {base64: myFile});
    await nftImageFile.saveIPFS();
    return nftImageFile.ipfs();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.primary}]}>

      <ScrollView style={{ width: '100%' }}>

        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Ionicons name="md-arrow-back-sharp" size={25} color="#222" />
        </TouchableOpacity>

        <ImageBackground source={{ uri: fileBanner }} resizeMode="cover" style={styles.banner} />

        <TouchableOpacity style={styles.editBanner} onPress={() => setIsPicker(1)}>
          <Icon name="edit" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.center}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: fileAvatar }}
          />
          <TouchableOpacity style={styles.editAvatar} onPress={() => setIsPicker(2)}>
            <Icon name="edit" size={22} color="#000" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.addressText}>{walletAddress}</Text>
          <Text style={styles.joinedText}>Joined December 2022</Text>
        </View>

        <View style={{ marginHorizontal: 12 }}>

          <Text style={[styles.t1, { color: colors.color3}]}>Enter your details</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.primary3, color: colors.text }]}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Name"
            placeholderTextColor={'#555'}
          />

          <Text style={[styles.t1, { color: colors.color3}]}>Enter your email</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.primary3, color: colors.text }]}
            onChangeText={onChangeEmail}
            value={email}
            placeholder="Email"
            placeholderTextColor={'#555'}
          />
          <Text style={styles.t2}>Add your email address to receive notifications about your activity on Foundation. This will not be shown on your profile.</Text>

          <Text style={[styles.t1, { color: colors.color3}]}>Enter your bio</Text>
          <TextInput
            style={[styles.input, { textAlignVertical: 'top', backgroundColor: colors.primary3, color: colors.text }]}
            onChangeText={onChangeBio}
            value={bio}
            placeholder="Enter your bio here"
            multiline
            numberOfLines={5}
            placeholderTextColor={'#555'}
          />
          <View style={{ marginTop: 12 }} />

          {isLoading ? <Loading /> : <LinearButton title='Save' onClick={onSaveProfile} />}
        
          <View style={styles.button}>
            <TouchableOpacity style={styles.btnLog} onPress={logoutUser}>
              <Text style={{ color: '#fff'}}>Log out</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 30 }} />

          {isPicker !== 0 && <ModalCamera
            onClickPicker={() => {
              setIsPicker(0);
              pickImage(isPicker);
            }}
            onClickCamera={() => {
              setIsPicker(0);
              takePicture(isPicker);
            }}
            onClose={()=>setIsPicker(0)}
          />}

          {
            isSuccessModal &&
            <ModalSuccess
              title={'Success'}
              description={'Your Profile is updated successfully'}
              onClose={() => setIsSuccessModal(false)}
              onClick={() => {
                setIsSuccessModal(false)
                navigation.goBack()
              }}
            />
          }

        </View>
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  center: {
    alignItems: 'center'
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
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: 'center',
    marginTop: 8
  },
  addressText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    color: '#888'
  },
  joinedText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 2
  },
  button: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10
  },
  input: {
    fontSize: 16,
    marginTop: 12,
    padding: 15,
    borderRadius: 12,
    paddingLeft: 16,
    backgroundColor: '#f0f0f0'
  },
  t1: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 30
  },  
  t2: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    marginTop: 2,
    marginLeft: 16
  },
  editAvatar: {
    marginTop: -20,
    width: 36,
    height: 36,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  editBanner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 2,
    top: 160
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
  btnLog: {
    width: 120,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default TabProfile;
