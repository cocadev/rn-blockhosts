import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, TextInput, Pressable, ImageBackground } from "react-native";
import { useMoralis } from "react-moralis";
import LinearButton from '../Components/LinearButton';
import Icon from 'react-native-vector-icons/AntDesign';
import ModalCamera from '../Components/ModalCamera';
import ModalList from '../Components/ModalList';
import ModalSuccess from '../Components/ModalSuccess';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { CATEGORIES_COLLECTIONS } from '../config/data';
import Loading from "../Components/loading";
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from "react-native-paper";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";

const CreateBrand = ({ navigation }) => {

  const { Moralis, isAuthenticated, user } = useMoralis();
  const [title, onChangeTitle] = useState();
  const [description, onChangeDescription] = useState();
  const [fileBanner, setFileBanner] = useState();
  const [fileAvatar, setFileAvatar] = useState();
  const { walletAddress } = useMoralisDapp();

  const [isPicker, setIsPicker] = useState(0);
  const [isTypeModal, setIsTypeModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const Brands = Moralis.Object.extend("RealBrands");

  const isAvailable = (title && description && fileBanner && category && fileAvatar) ? true : false;
  const { colors } = useTheme();

  const uploadImage = async (myFile) => {
    const nowTime = new Date().getTime();
    var nftImageFile = new Moralis.File(nowTime, {base64: myFile});
    await nftImageFile.saveIPFS();
    return nftImageFile.ipfs();
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

  const onSave = async () => {

    if(!isAuthenticated){
      navigation.navigate('Auth');
      return false;
    }

    setIsLoading(true);
    const avatar = await uploadImage(fileAvatar);
    const banner = await uploadImage(fileBanner);
    const brands = new Brands();

    brands.save({
      title,
      description,
      category: category.value,
      avatar,
      banner,
      creatorId: walletAddress,
      BGUID: uuidv4()
    }).then((myObject) => {
      setIsLoading(false);
      setIsSuccessModal(true);
      console.log('myObject', myObject)
    }, (error) => {  
      setIsLoading(false);
      console.log('error', error)
    });
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.primary}]}>
      <ScrollView style={{ paddingHorizontal: 12}}>

        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={22} color={colors.color7} />
          </TouchableOpacity>
          <Text style={[styles.t2, { color: colors.color7}]}>New Brand</Text>
        </View>

        <ImageBackground source={{ uri: fileBanner }} resizeMode="cover" style={[styles.banner, { backgroundColor: colors.img}]} />

        <TouchableOpacity style={styles.editBanner} onPress={() => setIsPicker(1)}>
          <Icon name="edit" size={22} color="#000" />
        </TouchableOpacity>

        <View style={styles.center}>
          <Image
            style={[styles.tinyLogo, { backgroundColor: colors.img }]}
            source={{ uri: fileAvatar }}
          />
          <TouchableOpacity style={[styles.editAvatar]} onPress={() => setIsPicker(2)}>
            <Icon name="edit" size={22} color="#000" />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.t5, { color: colors.color3 }]}>Information</Text>

        <TextInput
          style={[styles.input, { borderColor: colors.color2, color: colors.text}]}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="Title"
          placeholderTextColor={colors.colora}
        />

        <TextInput
          style={[styles.input, { textAlignVertical: 'top', borderColor: colors.color2, color: colors.text }]}
          onChangeText={onChangeDescription}
          value={description}
          placeholder="Description"
          multiline
          numberOfLines={4}
          placeholderTextColor={colors.colora}
        />

        <Text style={[styles.t5, { marginTop: 22, color: colors.color3}]}>Type</Text>

        <Pressable onPress={()=>setIsTypeModal(true)} style={[styles.select, {borderColor: colors.color2}]}>
          <Text style={{ color: colors.color5, fontSize: 16, paddingTop: 2}}>{category?.label}</Text>
          <Icon name="down" size={16} color="#555" />
        </Pressable>
      
        <View style={{ marginTop: 30 }} />

        <View>
          {isLoading ? <Loading /> : <LinearButton title='Save' onClick={onSave} disabled={!isAvailable}/>}
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
          isTypeModal && 
          <ModalList 
            data={CATEGORIES_COLLECTIONS}
            title={'Choose the type'} 
            onClose={()=>setIsTypeModal(false)}
            onCheckItem={(e)=>{
              setCategory(e)}
            }
            category={category?.value}
            onGoCollection={()=>navigation.navigate('CreateBrand')}
          />
        }

        {
          isSuccessModal &&
          <ModalSuccess 
            title={'Success'}
            description={'New Brand is created successfully'}
            onClose={() => setIsSuccessModal(false)}
            onClick={() => {
              setIsSuccessModal(false)
              navigation.goBack()
            }}
          />
        }

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  center: {
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  picBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 32,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 156
  },
  t0: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 8
  },
  t1: {
    color: '#888',
    fontWeight: '500',
    fontSize: 13,
    textAlign: 'center'
  },
  t2: {
    fontSize: 32,
    fontWeight: '700',
    color: '#777',
    marginLeft: 12
  },
  t5: {
    color: '#333',
    fontWeight: '700',
    fontSize: 14,
    marginTop: 16
  },
  input: {
    fontSize: 16,
    marginTop: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    paddingLeft: 16
  },
  file: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  select: {
    marginTop: 12,
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    paddingLeft: 16,
    height: 60, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  banner: {
    width: '100%',
    height: 200,
    alignItems: 'center',
    borderRadius: 8
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
    top: 225
  },
  tinyLogo: {
    width: 130,
    height: 130,
    borderRadius: 65,
    marginTop: -70,
    borderWidth: 2,
    borderColor: '#fff',
  },
});

export default CreateBrand;