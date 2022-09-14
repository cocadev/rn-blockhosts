import React, { useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useMoralis, useMoralisQuery, } from 'react-moralis';
import { DEMO_AVATAR } from "../config/keys";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import { useSelector } from "react-redux";
import Entypo from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/AntDesign';
import UtilService from "../utils/utilService";
import { CurrencyIcon } from "../config/data";
import usePrice from "../hooks/usePrice";
import { ScrollView } from "react-native-gesture-handler";
import { Video } from "expo-av";

const MyNFTScreen = ({ navigation }) => {

  const { Moralis, user, } = useMoralis();
  const { walletAddress } = useMoralisDapp();
  const ethPrice = usePrice();
  const [isValidImg, setIsValidImg] = useState([]);
  const [rewards, setRewards] = useState(0);
  const [selected, setSelected] = useState([]);
  const { data: brands } = useMoralisQuery("Brands");
  // const { data: balance } = useNativeBalance();
  const { nfts, nfts1155, } = useSelector(state => state.nfts)
  const allNFTs = [...nfts, ...nfts1155]
  const username = user?.attributes?.username;
  const photoUrl = user?.attributes?.avatar || DEMO_AVATAR;
  const account = user?.attributes.ethAddress || walletAddress;

  const realData = ([...nfts, ...nfts1155]).reduce(function (filtered, item) {
    if (item.owner_of?.toLowerCase() === walletAddress) {
      const metadata = JSON.parse(item.metadata);
      filtered.push({
        contract_type: item.contract_type,
        image: metadata.image,
        price: metadata.price,
        amount: item.amount,
        token_address: item.token_id
      })
    }
    return filtered;
  }, []);


  const onChangeSelected = (e) => {
    const dataArray = [...selected];
    const index = dataArray.indexOf(e);
    if (index > -1) { dataArray.splice(index, 1) }
    else { dataArray.push(e) }
    setSelected([...dataArray])
  }


  useEffect(() => {
    if (account) {
      setTimeout(() => {
        onGetRewards();
      }, 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const onGetRewards = async () => {

    const VerificationQuery = new Moralis.Query('Verification');
    VerificationQuery.equalTo('verifier', account);
    const count = await VerificationQuery.count();

    const RewardsQuery = new Moralis.Query('Rewards');
    RewardsQuery.equalTo('owner', account);
    const reward = await RewardsQuery.first();
    const totalRewards = Number(reward?.attributes?.BSC || 0) + Number(reward?.attributes?.ETH || 0) + Number(reward?.attributes?.MATIC || 0);
    setRewards(Moralis.Units.FromWei(totalRewards, 9) - (count * VERIFY_PRICE))
  }

  const myData = allNFTs
    .filter(item => {
      const { name, category } = JSON.parse(item.metadata);
      // return !!account && item.owner_of === account && !!name && !!category?.value
      return !!account && item.owner_of === account && !!name
    })
    .map(item => {
      const { name, category, chain } = JSON.parse(item.metadata);
      return {
        item,
        lazyMint: item.lazyMint || false,
        name,
        id: item.token_id,
        categoryId: (name ? category?.value : null) || 'non',
        chain
      }
    });

  const myDataCategoryList1 = myData.filter(item => !item.lazyMint).map(item => { return item?.categoryId })
  const myDataCategoryList2 = myData.map(item => { return item?.categoryId })
  const myLazyData = myData.filter(item => item?.lazyMint);

  const onErrorVideo = (e, pp) => {
    if (e) {
      setIsValidImg(isValidImg.concat(pp));
    } else {
      return null
    }
  }

  return (
    <ScrollView style={styles.root}>

      <View style={[styles.row, { margin: 3 }]}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Icon name="left" size={25} color={'#bbb'} />
        </TouchableOpacity>
        <Text style={styles.t3}>My NFTs </Text>
      </View>

      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Image source={{ uri: photoUrl }} alt="me" style={styles.tinyAvatar} />
          </View>
          <View>
            <Text style={styles.text}>{username}</Text>
            <Text style={styles.text}>{UtilService.truncate(walletAddress)}</Text>
          </View>
        </View>
      </View>

      <View />

      <View style={{ margin: 30 }}>
        <Text style={styles.text0}>My Wallet</Text>
        {/* <Text style={{ fontSize: 36, fontWeight: '600', color: '#fff' }}>{balance?.formatted || '0 ETH'}</Text> */}
      </View>

      <View style={styles.box}>
        <Text style={styles.text1}>Metasalt Tokens</Text>
        <Text style={styles.text1}>{rewards > 0 ? rewards : 0}</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.row} onPress={() => onChangeSelected('nft-owned')}>
            {!selected.includes('nft-owned') && <Entypo name="chevron-small-up" size={25} color={'#bbb'} />}
            {selected.includes('nft-owned') && <Entypo name="chevron-small-down" size={25} color={'#bbb'} />}
            <Text style={styles.text1}>Lazy NFTs</Text>
          </TouchableOpacity>
          <Text style={styles.text1}>{myData?.length}</Text>
        </View>

        {selected.includes('nft-owned') && <>
          <LazyMintAtom
            {...{
              selected,
              myLazyData,
              brands: [...brands, { id: 'non', attributes: { title: 'No Category' } }],
              onChangeSelected,
              myDataCategoryList2
            }}
            full={true}
          />
          {/* {NetData.map((item, index) =>
            <CustomAtom
              key={index}
              {...item}
              {...{ selected, myData, brands, onChangeSelected, myDataCategoryList1 }}
              full={true} />)} */}
        </>}
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.text1}>Mainnet NFTs</Text>
        {/* <Text>{GlobalBalances?.result?.length || 0}</Text> */}
      </View>

      <View>
        {realData?.map((item, index) =>
          <View key={index} style={{ flexDirection: 'row', position: 'relative', alignItems: 'center' }}>
            <View
              style={{ width: 80, height: 80, background: '#222', borderRadius: 8, marginTop: 12 }}
              onClick={() => navigate('/nftmarketplace/' + item.token_address)}
            >
              {/* <Image source={{ uri: item.image }} alt='nft' style={{ width: 80, height: 80 }} /> */}
              {isValidImg.includes('lazy' + index) && <Image source={{uri: item.image}} alt='nft' style={{ width: 80, height: 80 }} />}
              {!isValidImg.includes('lazy' + index) &&
                <Video
                  source={{ uri: item.image }}
                  rate={1.0}
                  volume={0}
                  isMuted={true}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={{width: 80, height: 80}}
                  onError={(e)=>onErrorVideo(e, 'lazy' + index)}
                />
                // <video src={item.image} preload="auto" autoPlay={true} onError={e => onErrorVideo(e, 'lazy' + index)} style={{ maxWidth: 80, maxHeight: 80 }}></video>
              }
            </View>
            {item.contract_type === 'ERC1155' && <Text style={styles.count}>{item.amount}</Text>}

            <View style={{ marginLeft: 12 }}>
              <Text style={styles.text}>Type: {item.contract_type}</Text>
              <Text style={styles.text}>Price: {item.price} ETH ({(item.price * ethPrice)?.toFixed(2)}$)</Text>
              {item.contract_type === 'ERC1155' && <Text style={styles.text3}>Total Price: {(item.price * item.amount)?.toFixed(2)} ETH ({(item.price * item.amount * ethPrice)?.toFixed(2)}$)</Text>}
            </View>
          </View>)}
      </View>

    </ScrollView>
  );
};

export default MyNFTScreen;

function CustomAtom({ selected, myData, saleCheckdataIds, brands, onChangeSelected, myDataCategoryList1, title, chain, idx, full }) {
  const total = myData.filter(x => (full ? true : saleCheckdataIds.includes(x.id)) && (x.chain === chain) && !x.lazyMint).length || 0;
  // let navigate = useNavigate();

  return (
    <View>
      <View>
        <View>
          {total > 0 && <TouchableOpacity>
            {selected.includes(idx) && <Entypo name="chevron-small-up" size={25} color={'#bbb'} />}
            {!selected.includes(idx) && <Entypo name="chevron-small-down" size={25} color={'#bbb'} />}
          </TouchableOpacity>}
          <Image source={{ uri: CurrencyIcon(chain) }} alt='icon' style={styles.tinyAvatar} />
          <Text style={styles.text}>{title}</Text>
        </View>
        <Text> style={styles.text}{total}</Text>
      </View>

      {selected.includes(idx) &&
        brands.map((item, index) => {
          if (!myDataCategoryList1.includes(item.id)) return null;
          const subTotal = myData.filter(x => x.categoryId === item.id && !x.lazyMint && x.chain === chain).length;
          return (
            <View key={index}>
              {subTotal > 0 && <TouchableOpacity onPress={() => onChangeSelected(idx + index)}>
                {selected.includes(idx + index) && <Entypo name="chevron-small-up" size={25} color={'#bbb'} />}
                {!selected.includes(idx + index) && <Entypo name="chevron-small-down" size={25} color={'#bbb'} />}
                <Text>{item.attributes.title} &nbsp; ({subTotal})</Text>
              </TouchableOpacity>}

              {selected.includes(idx + index) &&
                <View className="ml-20">
                  {myData.map((x, k) => {
                    if (x.categoryId !== item.id || x.lazyMint || x.chain !== chain) return null
                    return (
                      <Text
                        key={k}
                        style={styles.text}
                      // onPress={() => navigate('/allsales/' + x.id)}
                      >
                        {x.name}
                      </Text>)
                  })}
                </View>}
            </View>
          )
        }
        )}

    </View>
  )
}

function LazyMintAtom({ selected, myLazyData, saleCheckdataIds, brands, onChangeSelected, myDataCategoryList2, full }) {
  const total = myLazyData.filter(x => (full ? true : saleCheckdataIds.includes(x.id))).length || 0;
  // let navigate = useNavigate();
  const idx = 'nft-onsale-lazy';
  return (
    <View style={{ marginTop: 7, marginLeft: 18 }}>
      <View style={styles.box}>
        <TouchableOpacity style={styles.row} onPress={() => onChangeSelected(idx)}>
          {total > 0 && <View >
            {selected.includes(idx) && <Entypo name="chevron-small-up" size={25} color={'#bbb'} />}
            {!selected.includes(idx) && <Entypo name="chevron-small-up" size={25} color={'#bbb'} />}
          </View>}

          <Text style={styles.text}>{'Lazy Mint'}</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{total}</Text>
      </View>

      {selected.includes(idx) &&
        brands.map((item, index) => {
          if (!myDataCategoryList2?.includes(item.id)) return null;
          const myLazyFilterData = myLazyData.filter(x => x.categoryId === item.id);
          const subTotal = myLazyFilterData.length;

          return (
            <View key={index} style={{ marginTop: 7, marginLeft: 18 }}>
              {subTotal > 0 && <TouchableOpacity style={styles.row} onPress={() => onChangeSelected(idx + index)}>
                {selected.includes(idx + index) && <Entypo name="chevron-small-up" size={25} color={'#bbb'} />}
                {!selected.includes(idx + index) && <Entypo name="chevron-small-down" size={25} color={'#bbb'} />}
                <Text style={styles.text}>{item.attributes.title} &nbsp;({subTotal}) </Text>
              </TouchableOpacity>}

              {selected.includes(idx + index) &&
                <View style={{ marginLeft: 25, marginTop: 7 }}>
                  {myLazyFilterData.map((x, k) => {
                    return (
                      <Text
                        key={k}
                        style={styles.text2}
                      // onPress={() => navigate('/allsales/' + x.id)}
                      >
                        {x.name}
                      </Text>)
                  })}
                </View>}
            </View>
          )
        }
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text0: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  text: {
    color: '#bbb',
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ddd',
  },
  text2: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'yellow',
  },
  text3: {
    fontSize: 12,
    color: '#9acd3d',
  },
  t3: {
    fontSize: 24,
    fontWeight: '700',
    color: '#bbb',
    marginLeft: 12
  },
  tinyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000'
  },
  count: {
    width: 40,
    height: 20,
    top: 12,
    borderColor: 'grey',
    borderWidth: 1,
    color: '#9acd3d',
    textAlign: 'center',
    position: 'absolute',
    right: 3,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
  }
});