import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomNavbar from "../Components/CustomNavbar";

const TTTTT = [1, 2, 3, 4, 5]

const TabNFTAsset = ({ navigation }) => {

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} />
        <Text style={[styles.description]}>Hello again</Text>

        <View style={{ marginTop: 12 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#20d3b4', padding: 20, borderRadius: 25 }}>
            <View>
              <Text style={{ color: '#fff' }}>My Balance</Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <Text style={{ color: '#fff', fontSize: 34, fontWeight: '700' }}>81.971</Text>
                <Text style={{ color: '#fff', fontSize: 11 }}>USD</Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={{ color: '#fff', fontSize: 10, }}>1 ETH = 242.70 USD</Text>
              </View>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TouchableOpacity style={{ backgroundColor: '#fff', padding: 12, borderRadius: 20, alignItems: 'center' }}>
                <Text>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center', marginTop: 20 }}>
                <Text style={{ color: '#fff' }}>My Tokens</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView horizontal={true} style={{ marginTop: 20 }}>
            <View style={styles.box}>
              <Image source={require('../../assets/pay.png')} style={styles.logo} />
              <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>Redeem Tokens</Text>
              <Text style={{ color: '#9E9E9E' }}>Redeem tokens in host venues</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ paddingVertical: 12, paddingHorizontal: 18, backgroundColor: '#22DBBB', borderRadius: 12, marginTop: 12, width: 80 }}>
                  <Text style={{ color: '#fff' }}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.box}>
              <Image source={require('../../assets/logo.png')} style={styles.logo} />
              <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}> Token Marketplace</Text>
              <Text style={{ color: '#9E9E9E' }}>Find the best deals from hosts & brands</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ paddingVertical: 12, paddingHorizontal: 18, backgroundColor: '#22DBBB', borderRadius: 12, marginTop: 12, width: 80 }}>
                  <Text style={{ color: '#fff' }}>Select</Text>
                </View>
              </View>
            </View>

            <View style={[styles.box, { marginRight: 0 }]}>
              <Image source={require('../../assets/airdrop.png')} style={styles.logo} />
              <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 8 }}>Transfer Tokens</Text>
              <Text style={{ color: '#9E9E9E' }}>Airdrop tokens to friend accounts</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ paddingVertical: 12, paddingHorizontal: 18, backgroundColor: '#22DBBB', borderRadius: 12, marginTop: 12, width: 80 }}>
                  <Text style={{ color: '#fff' }}>Select</Text>
                </View>
              </View>
            </View>

          </ScrollView>

          <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 20 }}>Featured Drops</Text>

          <View style={{ flexDirection: 'row', backgroundColor: '#1f7868', padding: 10, borderRadius: 25, marginTop: 12 }}>
            <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
              <Image source={require('../../assets/nft.png')} style={{ width: 130, height: 150, borderRadius: 20 }} />
              <TouchableOpacity style={{ backgroundColor: '#000', marginTop: 12, borderRadius: 20, alignItems: 'center', width: 70 }}>
                <Text style={{ color: '#fff' }}>Buy</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 20, alignItems: 'center' }}>
                <Text style={{ color: '#fff' }}>Cool Beer</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', flex: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 8 }}>Available</Text>
                  <Text style={{ color: '#fff', fontSize: 12 }}>900</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', marginLeft: 8, flex: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 8 }}>Available</Text>
                  <Text style={{ color: '#fff', fontSize: 12 }}>900</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#fff', fontSize: 10, marginTop: 8 }}>
                Sweet Mead is a limited edition APA available in only 3 locations world wide. eDrinks savings are 30% RRP
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 20 }}>Activity</Text>

          <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <MaterialCommunityIcons name="wallet" size={44} color="#22DBBB" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ color: '#AEAEAE', fontWeight: '700' }}>Reviewed</Text>
                <Text style={{ color: '#AEAEAE', fontSize: 11 }}>0xe03afdsr93F....97f5F3Dd611311</Text>
              </View>
              <Image source={{ uri: 'https://lh3.googleusercontent.com/VTQyD8OI_cSjZIb3ZB95Clwol1L_ca710j6XlpFvtiSyzV17WoMDManRwi2EDjbsb6UD4blezMIwoNQEI4LbsABOwvPFldMZ5wa5Bw' }} style={{ width: 47, height: 62 }} />
            </View>
          </View>
          <View style={{ backgroundColor: '#fff', padding: 12, borderRadius: 12, marginTop: 12 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <MaterialCommunityIcons name="wallet" size={44} color="#F9699A" />
              <View style={{ marginLeft: 10, flex: 1 }}>
                <Text style={{ color: '#AEAEAE', fontWeight: '700' }}>Reviewed</Text>
                <Text style={{ color: '#AEAEAE', fontSize: 11 }}>0xe03afdsr93F....97f5F3Dd611311</Text>
              </View>
              <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2jHRqlMCQYdIhhR-_YFICLzqJRk4zVPoUQ&usqp=CAU' }} style={{ width: 47, height: 62 }} />
            </View>
          </View>
        </View>

      </ScrollView>

      <CustomNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    maxWidth: 220,
    marginRight: 12,
    // paddingBottom: 0
  }
});

export default TabNFTAsset;
