import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput, Image, TouchableOpacity } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import { useTheme } from "react-native-paper";
import Icon2 from 'react-native-vector-icons/AntDesign';
import { useMoralisCloudFunction, useMoralisQuery } from "react-moralis";
import Loading from "../Components/loading";

const AllGates = ({ navigation }) => {

  const { colors } = useTheme();
  const { data: users } = useMoralisCloudFunction('loadUsers')
  const { data: brands } = useMoralisQuery("RealBrands");
  const { data: allCollections } = useMoralisQuery("Brands");
  const { data: nFTGates, isLoading, } = useMoralisQuery("NFTGates", query => query.descending("createdAt"), [trigger]);
  const [searchKey, setSearchKey] = useState();
  const [trigger, setTrigger] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setTrigger(trigger + 1);
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View style={[styles.root, { backgroundColor: colors.primary }]}>
      <ScrollView style={{ paddingHorizontal: 6 }}>

        <CustomHeader navigation={navigation} />

        <Text style={[styles.t2,]}>Search, Authenticate, Access</Text>

        <Text style={[styles.description,]}>Communites</Text>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.f0, color: colors.color2 }]}
            onChangeText={e => setSearchKey(e)}
            value={searchKey}
            placeholder="Search Gates"
            placeholderTextColor={'#666'}
          />
          <Icon2 name="search1" size={15} color="#666" style={styles.icon} />
        </View>
        
        {(nFTGates.length === 0) && <Loading />}

        <View>
          {
            nFTGates.map((item, index) => {
              
              const cKey = searchKey?.toLowerCase();
              if (searchKey && (!item.attributes.title?.toLowerCase().includes(cKey) && !item.attributes.description?.toLowerCase().includes(cKey))) return false;

              const gateBrand = brands.find(x => x.id === item.attributes.brand)
              const gateCollection = allCollections.find(x => x.id === item.attributes.collection)

              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.box} 
                  onPress={() => {
                    const me = users?.find(z => z.id === item.attributes.owner)

                    const user_avatar = me?.attributes?.avatar;
                    const username = me?.attributes?.username;
                    const userId = me?.id;

                    navigation.navigate("GateDetail", {
                      image: item.attributes.img,
                      title: item.attributes.title,
                      type: item.attributes.type,
                      brand: gateBrand,
                      collection: gateCollection,
                      user_avatar, 
                      username,
                      userId,
                      nfts: JSON.parse(item.attributes.nfts || "{}"),
                      contents: JSON.parse(item.attributes.contents || "{}"),
                      globalNFT: JSON.parse(item.attributes.globalNFTs || "[]"),
                    })
                  }}
                >
                  <Image
                    source={{ uri: item.attributes.img }}
                    style={styles.logo}
                  />
                  <View style={{marginLeft: 10, overflow: 'hidden'}}>
                    <Text style={styles.text}><Text style={styles.title}>Title:</Text> {item.attributes.title}</Text>
                    <Text style={styles.text}><Text style={styles.title}>Type:</Text> {item.attributes.type}</Text>
                    <Text style={styles.text}><Text style={styles.title}>Brand:</Text> {gateBrand?.attributes?.title || '-'}</Text>
                    <Text style={styles.text}><Text style={styles.title}>Collection:</Text> {gateCollection?.attributes?.title || '-'}</Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>

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
    fontSize: 40,
    fontWeight: '700',
    color: '#ccc'
  },
  input: {
    fontSize: 15,
    position: 'relative',
    height: 46,
    paddingLeft: 35,
    borderRadius: 8,
  },
  inputView: {
    marginHorizontal: 20,
    position: 'relative',
    marginTop: 15,
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 12
  },
  box: {
    flexDirection: 'row',
    backgroundColor: '#333',
    margin: 5,
    padding: 5,
    borderRadius: 12,
    marginTop: 10
  },
  logo: {
    width: 90,
    height: 90,
    borderRadius: 6
  },
  title: {
    color: '#e5e510', 
    fontWeight: 'bold'
  },
  text: {
    color: '#bbb',
    maxWidth: 240,
    fontSize: 15
  }
});

export default AllGates;
