import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { StyleSheet, Dimensions, TouchableOpacity, View, Text, ScrollView, Image } from "react-native";
import CustomHeader from "../Components/CustomHeader";
import CustomNavbar from "../Components/CustomNavbar";
import { WebView } from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

const ShareScreen = ({ navigation }) => {

  const [ramper, setRamper] = useState();
  const { isInitialized, Moralis } = useMoralis();

  useEffect(() => {
    async function initPlugin() {
      Moralis.Plugins.fiat
        .buy({}, { disableTriggers: true })
        .then((data) => setRamper(data.data));
    }
    isInitialized && initPlugin();
  }, [isInitialized]);

  console.log('ramper', ramper)

  return (
    <View style={styles.root}>

      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} title={'My Tokens'} />

        <View style={styles.webview}>
          <WebView
            style={styles.box}
            originWhitelist={['*']}
            source={{ html: `
            <iframe
  src="https://widget.onramper.com?color=266677&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
  height="660px"
  width="482px"
  title="Onramper widget"
  frameborder="0"
  allow="accelerometer;
  autoplay; camera; gyroscope; payment"
  style="box-shadow: 1px 1px 1px 1px
  rgba(0,0,0,0.2);"
>
  <a href="https://widget.onramper.com" target="_blank">Buy crypto</a>
</iframe>
          //   <iframe
          //   src={${ramper}}
          //   title="ramper"
          //   frameBorder="no"
          //   allow="accelerometer; autoplay; camera; gyroscope; payment;"
          //   style={{
          //     width: "420px",
          //     height: "625px",
          //     boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          //     border: "1px solid #e7eaf3",
          //     borderRadius: "1rem",
          //     backgroundColor: "white",
          //   }}
          // />
          ` }}
          />
        </View>



        {/* <iframe
          src={ramper}
          title="ramper"
          frameBorder="no"
          allow="accelerometer; autoplay; camera; gyroscope; payment;"
          style={{
            width: "420px",
            height: "625px",
            boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
            border: "1px solid #e7eaf3",
            borderRadius: "1rem",
            backgroundColor: "white",
          }}
        /> */}

        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/qr.png')} style={styles.banner} />
        </View>

        <View>
          <Text style={styles.t1}>Staff Scan to Redeeem</Text>
          <Text style={styles.t2}>
            The standard Lorem Ipsum passage, used since the 1500s</Text>
          <Text style={styles.t3}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Text>
        </View>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#727375' }]} onPress={() => navigation.navigate('ReceiveToken')}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />

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
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBack: {
    position: 'absolute',
    left: 1,
    top: 22,
    zIndex: 100
  },
  tinyLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#000'
  },
  tinyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#000'
  },
  banner: {
    width: screenWidth - 74,
    marginTop: 20,
    borderRadius: 15,
    height: screenWidth - 74,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: screenWidth - 24,
    marginTop: 60,
    borderRadius: 15,
    height: 280,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  t1: {
    fontSize: 18,
    marginTop: 12,
    fontWeight: '700',
    marginHorizontal: 4,
    marginTop: 25,
    textAlign: 'center',
    color: '#111'
  },
  t2: {
    marginTop: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#111',
    marginHorizontal: 12,
  },
  t3: {
    marginTop: 12,
    fontSize: 11,
    fontWeight: '500',
    color: '#111',
    marginHorizontal: 12,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },

  t4: {
    fontSize: 18,
    marginLeft: 12,
    fontWeight: '700'
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    height: 50,
    marginHorizontal: 2,
    backgroundColor: '#333'
  },
  box2: {
    marginHorizontal: 2,
    marginTop: 37,
    padding: 14,
    paddingVertical: 18,
    borderRadius: 18,
    elevation: 3
  },
  box3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 17,
    padding: 12,
    borderRadius: 18,
    elevation: 3,
    marginHorizontal: 2,
  },
  t5: {
    fontSize: 22,
    fontWeight: '400'
  },
  t7: {
    color: '#888',
    fontSize: 16,
    fontWeight: '700'
  },
  t8: {
    fontSize: 16,
    fontWeight: '400',
    marginTop: 12
  },
  t9: {
    color: '#555',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 12,
    marginBottom: 5
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    minWidth: 250,
    backgroundColor: '#22DBBB',
    borderRadius: 12,
    marginTop: 50,
    marginHorizontal: 30
  },
  webview: {
    width:300,
    height: 300,
    borderWidth: 2,
    borderColor: 'red'
  },
  box: {
    width:300,
    height: 300,
  }
});

export default ShareScreen;
