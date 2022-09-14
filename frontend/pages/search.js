import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Image, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon2 from 'react-native-vector-icons/AntDesign';
import CustomHeader from '../Components/CustomHeader';
import { CATEGORIES_COLLECTIONS, CHAIN_LIST } from "../config/data";
import { useNFTBalance } from "../hooks/useNFTBalance";
import ListNFT from "../Components/ListNFT";
import { useTheme } from "react-native-paper";

const SearchScreen = ({ navigation }) => {

  const { NFTBalance } = useNFTBalance();
  const { colors } = useTheme();

  const [bigSearch, setBigSearch] = useState({
    brands: [],
    price: { min: null, max: null },
    chains: [],
    text: ''
  })

  const onChangeText = (e) => {
    setBigSearch({ ...bigSearch, text: e })
  }

  const onChangeInput = (value, type) => {
    const new_price = {
      min: type === 'min' ? value : bigSearch.price.min,
      max: type === 'max' ? value : bigSearch.price.max,
    }
    console.log(new_price)
    setBigSearch({ ...bigSearch, price: new_price })
  }

  const onChangeChains = (e) => {
    let chains = bigSearch.chains;
    const index = chains.indexOf(e);
    if (index > -1) { chains.splice(index, 1) }
    else { chains.push(e) }
    setBigSearch({ ...bigSearch, chains })
  }

  const onChangeBrand = (e) => {
    let brands = bigSearch.brands;
    const index = brands.indexOf(e);
    if (index > -1) { brands.splice(index, 1) }
    else { brands.push(e) }
    setBigSearch({ ...bigSearch, brands })
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} disableSearch={true} />

        <View >
          <View style={styles.inputView}>
            <TextInput
              style={[styles.input, { backgroundColor: colors.f0, color: colors.color2 }]}
              onChangeText={onChangeText}
              value={bigSearch.text}
              placeholder="Search items"
              placeholderTextColor={colors.color2}
            />
            <Icon2 name="search1" size={15} color="#666" style={styles.icon} />
          </View>

        </View>

        <View style={[styles.view, { paddingHorizontal: 12 }]}>
          <Text style={[styles.title, { color: colors.color3 }]}>Brand</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              CATEGORIES_COLLECTIONS.map((item, index) =>
                bigSearch.brands.includes(item.value)
                  ? <Tagging key={index} item={item} onClick={() => onChangeBrand(item.value)} />
                  : <UnTagging key={index} item={item} onClick={() => onChangeBrand(item.value)} />
              )
            }
          </View>

          <Text style={[styles.title, { color: colors.color3 }]}>Price range</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: colors.color3 }}>From</Text>
            <TextInput
              style={[styles.input, { width: 100, marginLeft: 12, backgroundColor: colors.f0, color: colors.color2 }]}
              onChangeText={(e) => onChangeInput(e, 'min')}
              value={bigSearch.price.min}
              type='number'
              placeholderTextColor={colors.color2}
            />
            <Text style={{ marginLeft: 12, color: colors.color3 }}>To</Text>
            <TextInput
              style={[styles.input, { width: 100, marginLeft: 12, backgroundColor: colors.f0, color: colors.color2 }]}
              onChangeText={(e) => onChangeInput(e, 'max')}
              value={bigSearch.price.max}
              type='number'
              placeholderTextColor={colors.color2}
            />
          </View>

          <Text style={[styles.title, { color: colors.color3 }]}>Chains</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              CHAIN_LIST.map((item, index) =>
                bigSearch.chains.includes(item.value) ? <Tagging
                  key={index} item={item}
                  onClick={() => onChangeChains(item.value)}
                /> : <UnTagging
                  key={index} item={item}
                  onClick={() => onChangeChains(item.value)}
                />)
            }
          </View>
        </View>

        {NFTBalance.length > 0 &&
          <ListNFT
            data={NFTBalance
              .filter((item, index) => item.metadata !== null && index < 50)
              .filter((item,) => {

                const searchKey = bigSearch.text?.toLowerCase();
                const { price, name, description } = JSON.parse(item.metadata);
                const isSearchAvailable = name?.toLowerCase().includes(searchKey) || description?.toLowerCase().includes(searchKey) || !searchKey;

                const isEth = bigSearch.chains.includes('eth');
                const isBsc = bigSearch.chains.includes('bsc');
                const isPolygon = bigSearch.chains.includes('polygon');
                const isChainAvailable = (isBsc || isPolygon) && !isEth;

                const { min, max } = bigSearch.price;
                const isPossible = ((Number(min) <= price * 1) || !min) && ((Number(max) >= price * 1) || !max);

                if (!isSearchAvailable || isChainAvailable || !isPossible) {
                  return null
                } else {
                  return item
                }

              })
            }
            navigation={navigation}
          />}


      </ScrollView>
    </View>
  );
};

function Tagging({item, onClick}) {

  const { value } = item;

  return (
    <TouchableOpacity
      style={styles.tagView}
      onPress={onClick}
    >
      <LinearGradient
        colors={['#0038F5', '#9F03FF']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.button}>
        <Text style={styles.tag}>{value}</Text>
      </LinearGradient>
    </TouchableOpacity>
  )
}

function UnTagging({item, onClick}) {

  const { value } = item;
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.tagView, { backgroundColor: colors.f0}]}
      onPress={onClick}
    >
      <View
        style={styles.button}>
        <Text style={[styles.tag, { color: colors.color3 }]}>{value}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 14,
    marginBottom: 6
  },
  text: {
    fontSize: 18,
    lineHeight: 45,
    fontWeight: "bold",
    color: '#333',
    marginTop: 12,
    textAlign: 'left'
  },
  input: {
    fontSize: 15,
    position: 'relative',
    height: 46,
    paddingLeft: 35,
    borderRadius: 8,
    backgroundColor: '#f0f0f0'
  },
  inputView: {
    marginHorizontal: 12,
    position: 'relative',
    marginTop: 15,
  },
  view: {
    paddingHorizontal: 10,
  },
  tagView: {
    margin: 5,
    borderRadius: 12
  },
  tag: {
    color: '#fff',
    marginHorizontal: 4,
    marginVertical: 4,
    padding: 4,
    paddingHorizontal: 16,
    borderRadius: 18
  },
  button: {
    borderRadius: 22
  },
  icon: {
    position: 'absolute',
    top: 15,
    left: 12
  }
});

export default SearchScreen;