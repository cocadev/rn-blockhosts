import React, { useEffect} from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ImageBackground,  } from 'react-native';
import { useMoralis, useMoralisCloudFunction, useMoralisWeb3Api } from "react-moralis";
import { useDispatch, useSelector } from "react-redux";
import { onGetData } from "../store/actions/nfts/nfts";
import { getUserData } from "../store/actions/users/users";
import { useGetChainId } from "../hooks/useGetChainId";
import { useToast } from "react-native-toast-notifications";
import { PROD,  } from "../config/keys";

const HomeScreen = ({navigation}) => {

  const { Moralis, logout } = useMoralis();
  const { nfts } = useSelector(state => state.nfts)
  const { users } = useSelector(state => state.users)
  const dispatch = useDispatch();
  const { chainId, setChainId } = useGetChainId();
  const Web3Api = useMoralisWeb3Api();

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
  useEffect(()=> {
    if(chainId && chainId !== '0x1' && PROD){
      toast.show(`Please connect the mainnet(Ethereum Network)!`);
      logout();
      setChainId(-1);
    }
    if(chainId && chainId === '0x1' && !PROD){
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

  return (
    <View style={styles.root}>

      <View style={styles.viewContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={{color: '#fff', fontSize: 25}}>{'BlackHosts Wallet'}</Text>
        <Text style={{color: '#fff', fontSize: 17, textAlign: 'center', marginTop: 12, maxWidth: 240}}>{'Buy, Store and Redeem Hospitality Tokens Easily'}</Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#fff'}]} 
          onPress={()=>navigation.navigate("Explore")}
        >
          <Text style={{color: '#000', fontSize: 16}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleCryptoLogin}>
          <Text style={{color: '#fff', fontSize: 16}}>Connect External Wallet</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#22dbbb'
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
    backgroundColor: '#0c4d41', 
    borderRadius: 12, 
    marginTop: 20
  }
});

export default HomeScreen;