import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, CheckBox, } from 'react-native';
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

const EditProfileScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const { isAuthenticated, Moralis, authError, authenticate, isAuthenticating, logout } = useMoralis();
  const { nfts } = useSelector(state => state.nfts)
  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch();
  const { chainId, setChainId } = useGetChainId();
  const Web3Api = useMoralisWeb3Api();
  const connector = useWalletConnect();
  const [visible, setVisible] = useState(false);
  const toast = useToast();
  const { data: userData } = useMoralisCloudFunction('loadUsers');
  const [isSelected, setSelection] = useState(false);

  const handleCryptoLogin = () => {

    authenticate({
      connector,
      // provider: "walletconnect",
      // mobileLinks: ["metamask"],
      signingMessage: "Metasalt authentication",
    })
      .then((res) => {

        if (authError) {
          setVisible(true);
        } else {
          if (isAuthenticated) {
            // navigation.navigate("Home");
          }
        }
      })
      .catch(() => { });
  };

  const onNavigate = (e) => {
    navigation.navigate(e)
  }

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
            <Text style={{ color: '#92959d', fontSize: 16 }}>Name</Text>
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
  }
});

export default EditProfileScreen;