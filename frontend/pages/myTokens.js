import React from "react";
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CustomHeader from '../Components/CustomHeader';
import CustomNavbar from '../Components/CustomNavbar';

const TTTTT = [1, 2, 3, 4, 5]

const MyTokensScreen = ({ navigation }) => {

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'My Tokens'} />

        <View style={{ marginTop: 12 }}>
          <FlatList
            numColumns={2}
            data={[
              { key: 'Devin' },
              { key: 'Dan' },
              { key: 'Dominic' },
              { key: 'Jackson' },
              { key: 'James' },
              { key: 'Joel' },
              { key: 'John' },
              { key: 'Jillian' },
              { key: 'Jimmy' },
              { key: 'Julie' },
            ]}
            renderItem={({ item }) => <View style={{ flex: 1, backgroundColor: '#202020', padding: 4, borderRadius: 6, margin: 5 }}>
              <View style={{ padding: 5, }}>
                <Image source={{ uri: 'https://i.insider.com/62d9773b0c98f500195ed88e?width=631&format=jpeg' }} style={{ width: 140, height: 150, borderRadius: 8 }} />
                <Text style={{ color: '#fff', fontSize: 10, marginTop: 4 }}>Special Brew [Comic Series]</Text>
                <View style={{ flexDirection: 'row', marginTop: 6 }}>
                  <Text style={{ color: '#ccc', fontSize: 8 }}>Host</Text>
                  <Text style={{ color: '#fff', fontSize: 8, marginLeft: 12 }}>Corner Pub Venezia</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 1 }}>
                  <Text style={{ color: '#ccc', fontSize: 8 }}>Valid</Text>
                  <Text style={{ color: '#fff', fontSize: 8, marginLeft: 12 }}>09.06.2022</Text>
                </View>
              </View>
              <View style={{ flex: 1, marginLeft: 4 }}>

                <Text style={{ color: '#bbb', fontSize: 7 }}>
                  Cash value at the bar
                </Text>
              </View>
            </View>}
          />

        </View>
      </ScrollView>
      <CustomNavbar />

    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  box: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    maxWidth: 220,
    marginRight: 20,
  },
});

export default MyTokensScreen;
