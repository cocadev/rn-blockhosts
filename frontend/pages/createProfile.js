import React, { useEffect, useState } from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground, } from 'react-native';
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

const CreateProfileScreen = ({ navigation }) => {

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

  useEffect(() => {
    if (users?.length === 0 && userData?.length > 0) {
      dispatch(getUserData(userData?.map(item => {
        return {
          id: item.id,
          createdAt: item.attributes.createdAt,
          account: item.attributes.ethAddress,
          avatar: item.attributes.avatar,
          banner: item.attributes.banner,
          GUID: item.attributes.GUID,
          email: item.attributes.email,
          phone: item.attributes.phone,
          username: item.attributes.username,
          twitter: item.attributes.twitter,
          instagram: item.attributes.instagram,
          site: item.attributes.site,
          bio: item.attributes.bio,
        }
      })))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData])
  useEffect(() => {
    if (chainId && chainId !== '0x1' && PROD) {
      toast.show(`Please connect the mainnet(Ethereum Network)!`);
      logout();
      setChainId(-1);
    }
    if (chainId && chainId === '0x1' && !PROD) {
      toast.show(`Please connect test networks(Ropsten, Rinkeby, Mumbai or Test BSC)!`);
      logout();
      setChainId(-1);
    }
  }, [chainId])

  useEffect(() => {
    if (nfts.length === 0 && Web3Api) {
      setTimeout(() => {
        const LazyMints = Moralis.Object.extend("LazyMints");
        const query = new Moralis.Query(LazyMints).limit(5000);
        dispatch(onGetData(query, chainId, Web3Api))
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const hideDialog = () => setVisible(false);

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
    <View style={styles.root}>

      <View style={styles.viewContainer}>
        <Text style={{ color: '#000', fontSize: 28, fontWeight: '700' }}>{'Create Your Profile'}</Text>

        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <View style={{ flexDirection: 'row', marginTop: 5 }}>
        </View>
      </View>

      <Text style={{textAlign: 'center', marginTop: 20}}>0xCC00...b8E50</Text>

      <View style={{ marginHorizontal: 30, marginVertical: 20 }}>

        <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} >
          <Text style={{color: '#92959d', fontSize: 16}}>Name</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={{color: '#92959d', fontSize: 16}}>Number</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} >
          <Text style={{color: '#92959d', fontSize: 16}}>Country</Text>
        </TouchableOpacity>

        <Text style={{textAlign: 'center', marginTop: 20, color: '#92959d'}}>I agree to the terms and conditions of use</Text>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#22DBBB'}]} >
          <Text style={{color: '#fff', fontSize: 16}}>Finish</Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={{ height: 20 }} />

    </View>
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
    height: 160,
    width: 160
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
    backgroundColor: '#eff2f6', 
    borderRadius: 12, 
    marginTop: 20
  }
});

export default CreateProfileScreen;