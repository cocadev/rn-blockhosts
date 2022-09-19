import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, CheckBox, TextInput, } from 'react-native';
import LinearButton from "../Components/LinearButton";
import { useMoralis, useMoralisCloudFunction, useMoralisWeb3Api } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { onGetData } from "../store/actions/nfts/nfts";
import { getUserData } from "../store/actions/users/users";
import { useGetChainId } from "../hooks/useGetChainId";
import { useWalletConnect } from "../WalletConnect";
import { Button, Paragraph, Dialog, Portal, Provider, ActivityIndicator, useTheme } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";
import { PROD, VERSION } from "../config/keys";
import { ScrollView } from "react-native-gesture-handler";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";

const EditProfileScreen = ({ navigation }) => {

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
    <ScrollView style={styles.root}>

      <View style={styles.viewContainer}>
        <Text style={{ color: '#000', fontSize: 25, fontWeight: '700' }}>{'Edit Your Profile'}</Text>

        <Image source={require('../../assets/profile.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
        </View>
      </View>

      <Text style={{ textAlign: 'center', marginTop: 12, color: '#3C404B' }}>0xCC00...b8E50</Text>

      <View style={{ marginHorizontal: 30, marginVertical: 20 }}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} >
            <TextInput style={{ color: '#000', fontSize: 16 }} 
              placeholder={'Name'}
              placeholderTextColor={'#92959d'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={{ color: '#92959d', fontSize: 16 }}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={{ color: '#92959d', fontSize: 16 }}>Number</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
            <Text style={{ color: '#92959d', fontSize: 16 }}>Country</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#000' }]} 
            onPress={()=> navigation.navigate('Explore')}  
          >
            <Text style={{ color: '#fff', fontSize: 16 }}>Save</Text>
          </TouchableOpacity>

            <TouchableOpacity style={styles.btnLog} onPress={logoutUser}>
              <Text style={{ color: '#fff'}}>Log out</Text>
            </TouchableOpacity>

        </View>
      </View>

      <View style={{ height: 20 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff'
  },
  centeredView: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    marginTop: 40
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  t1: {
    fontSize: 40,
    lineHeight: 70,
    fontWeight: '700'
  },
  viewContainer: {
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginTop: 40
  },
  logo: {
    height: 130,
    width: 130,
    borderRadius: 65,
    marginTop: 12
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    minWidth: 250,
    backgroundColor: '#eff2f6',
    borderRadius: 12,
    marginTop: 20
  },
  btnLog: {
    width: 120,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }
});

export default EditProfileScreen;