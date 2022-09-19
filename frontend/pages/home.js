import React, { useEffect } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground, } from 'react-native';
import { useMoralis, useMoralisCloudFunction, useMoralisWeb3Api } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { onGetData } from "../store/actions/nfts/nfts";
import { getUserData } from "../store/actions/users/users";
import { useGetChainId } from "../hooks/useGetChainId";
import { useToast } from "react-native-toast-notifications";
import { PROD, } from "../config/keys";
import { useWalletConnect } from "../WalletConnect";

const HomeScreen = ({ navigation }) => {

  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();
  const { nfts } = useSelector(state => state.nfts)
  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch();
  const { chainId, setChainId } = useGetChainId();
  const Web3Api = useMoralisWeb3Api();
  const connector = useWalletConnect();

  const toast = useToast();

  const handleCryptoLogin = () => {

    authenticate({
      connector,
      signingMessage: "Metasalt authentication",
    })
      .then((res) => {

        if (authError) {
          setVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.navigate("CreateProfile");
          }
        }
      })
      .catch(() => { });
  };

  return (
    <View style={styles.root}>

      <View style={styles.viewContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={{ color: '#fff', fontSize: 25, marginTop: 12 }}>{'BlackHosts Wallet'}</Text>
        <Text style={{ color: '#fff', fontSize: 15, textAlign: 'center', marginTop: 18, maxWidth: 240 }}>{'Buy, Store and Redeem Hospitality Tokens Easily'}</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff' }]}
          onPress={() => navigation.navigate("Explore")}
        >
          <Text style={{ color: '#000', fontSize: 16 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCryptoLogin}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Connect External Wallet</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#22dbbb',
    justifyContent: 'space-around'
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
    width: 130
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
    paddingVertical: 20,
    minWidth: 250,
    backgroundColor: '#0c4d41',
    borderRadius: 12,
    marginTop: 20
  }
});

export default HomeScreen;