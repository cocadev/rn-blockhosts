import React, { useEffect } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "../WalletConnect";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {

  const {
    authenticate,
    authError,
    isAuthenticated,
  } = useMoralis();
  const connector = useWalletConnect();
  const navigation = useNavigation();

  const handleCryptoLogin = () => {

    authenticate({
      connector,
      signingMessage: "Blockhosts authentication",
    })
      .then((res) => {
        console.log('res', res)
        if (authError) {
          console.log('authError', authError)

          // setVisible(true);
        } else {
          console.log('isAuthenticated', isAuthenticated)
          if (isAuthenticated) {
            navigation.navigate("Home");
          }
        }
      })
      .catch((e) => { 
        console.log('e', e)
      });
  };

  useEffect(() => {
    if(isAuthenticated){
      navigation.navigate("Home");
    }
  }, [isAuthenticated]);

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
          onPress={() => navigation.navigate("Web3Auth")}
        >
          <Text style={{ color: '#000', fontSize: 16 }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCryptoLogin}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Connect External Wallet 2</Text>
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

export default AuthScreen;