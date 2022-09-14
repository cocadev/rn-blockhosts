import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import ListNFT from '../Components/ListNFT';
import CustomHeader from '../Components/CustomHeader';
import { useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import Loading from "../Components/loading";

const TabNFTAsset = ({ navigation }) => {

  const { colors } = useTheme();
  const [search, setSearch] = useState();
  const { nfts, nfts1155, } = useSelector(state => state.nfts)

  const NFTBalance = useMemo(()=>{
    return [...nfts, ...nfts1155]
    ?.sort(function (a, b) {
      return new Date(b.synced_at) - new Date(a.synced_at)
    })
    ?.filter((item) => {
      const metadata = JSON.parse(item.metadata);
      const { name } = metadata;
      return !search || name?.toLowerCase()?.includes(search?.toLowerCase())
    })
    ?.filter((item, index) => index < 10)
  }, [search, nfts, nfts1155])
  
  return (
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} />
        <Text style={[styles.t2]}>Create, Buy, and Sell</Text>
        <Text style={[styles.description]}>Marketplace</Text>

        <View style={styles.boxing}>
          <TextInput
            style={styles.input}
            onChangeText={(e) => setSearch(e)}
            value={search}
            placeholder="Search Title"
            placeholderTextColor={'#444'}
          />
        </View>

        {
          (NFTBalance.length === 0 && !search) 
          ? <Loading />
          : <ListNFT
            data={NFTBalance?.filter((item, index) => item.metadata !== null)}
            navigation={navigation}
          /> 
        }

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  t2: {
    paddingTop: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '300',
    color: '#777'
  },
  description: {
    textAlign: 'center',
    fontSize: 50,
    fontWeight: '700',
    color: '#ccc'
  },
  boxing: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btn: {
    width: 78,
    height: 32,
    margin: 2,
    borderRadius: 8,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 5,
    marginLeft: 1,
    flex: 1,
    borderColor: '#888',
    marginTop: 18,
    color: '#bbb',
  },
});

export default TabNFTAsset;
