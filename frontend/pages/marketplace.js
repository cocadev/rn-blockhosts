import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import { useTheme } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TTTTT = [1, 2, 3, 4, 5]

const MarketplacePage = ({ navigation }) => {

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'Marketplace'} />

        <View style={{ marginTop: 12 }}>

          <View style={{ flexDirection: 'row', backgroundColor: '#1f7868', padding: 10, borderRadius: 25, marginTop: 12 }}>
            <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
              <Image source={{ uri: 'https://i.insider.com/62d9773b0c98f500195ed88e?width=631&format=jpeg' }} style={{ width: 130, height: 150, borderRadius: 20 }} />
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

          {TTTTT.map((item, index) => <View key={index} style={{ flexDirection: 'row', backgroundColor: '#ededed', padding: 10, borderRadius: 25, marginTop: 12 }}>
            <View style={{ padding: 8, backgroundColor: '#fff', borderRadius: 30, alignItems: 'center' }}>
              <Image source={{ uri: 'https://i.insider.com/62d9773b0c98f500195ed88e?width=631&format=jpeg' }} style={{ width: 130, height: 150, borderRadius: 20 }} />
              <Text style={{ color: '#000', fontSize: 10 }}>Lolipop</Text>
              <TouchableOpacity style={{ backgroundColor: '#000', marginTop: 2, borderRadius: 20, alignItems: 'center', width: 70 }}>
                <Text style={{ color: '#fff' }}>Buy</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'center' }}>
                <TouchableOpacity style={{ backgroundColor: '#0d453c', padding: 12, borderRadius: 12, alignItems: 'center', flex: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 8 }}>Total</Text>
                  <Text style={{ color: '#fff', fontSize: 12 }}>900</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#22DBBB', padding: 12, borderRadius: 12, alignItems: 'center', marginLeft: 8, flex: 1 }}>
                  <Text style={{ color: '#fff', fontSize: 8 }}>Price</Text>
                  <Text style={{ color: '#fff', fontSize: 12 }}>$6.90</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ color: '#174B42', fontSize: 10, marginTop: 8 }}>
                Breaking Good Drinks Lab are famouse for their hands on approach to customer creativity and loyalty. Each eDrink comes...
              </Text>
            </View>
          </View>)}


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
  logo: {
    width: 50,
    height: 50
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    maxWidth: 220,
    marginRight: 20,
    // paddingBottom: 0
  }
});

export default MarketplacePage;
