import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import SplashScreen from "./pages/splash";
import HomeScreen from "./pages/home";
import LoginScreen from "./pages/login";
import CreateNFTScreen from "./pages/createNFT";
import NFTDetailScreen from "./pages/detailNFT";
import NFTOwnerScreen from "./pages/detailOwner";
import DetailCollectionScreen from "./pages/detailCollection";
import CreateCollectionScreen from "./pages/createCollection";
import CreateBrandScreen from "./pages/createBrand";
import TabCollection from "./pages/collections";
import Profile from "./pages/profile";
import TabNFTAsset from "./pages/explore";
import SearchScreen from "./pages/search";
import ScannerScreen from "./pages/scanner";
import AllGatesScreen from "./pages/allGates";
import DetailGateScreen from "./pages/detailGate";
import VideoDetailScreen from "./pages/videoDetail";
import MyTokensScreen from "./pages/myTokens";
import MyNFTScreen from "./pages/myNFTs";

import { Provider } from 'react-redux';
import store from "./store/store";
import { ToastProvider } from 'react-native-toast-notifications'
const Moralis = require('moralis/react-native.js');
const AsyncStorage = require('react-native').AsyncStorage;
Moralis.setAsyncStorage(AsyncStorage);

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const ROUTES = [
  { name: 'SplashScreen', component: SplashScreen },
  { name: 'Auth', component: LoginScreen },
  // { name: 'Home', component: HomeScreen },
  { name: 'Home', component: MyTokensScreen },
  { name: 'CreateNFT', component: CreateNFTScreen },
  { name: 'NFTDetail', component: NFTDetailScreen },
  { name: 'NFTOwner', component: NFTOwnerScreen },
  { name: 'CollectionDetail', component: DetailCollectionScreen },
  { name: 'CreateCollection', component: CreateCollectionScreen },
  { name: 'CreateBrand', component: CreateBrandScreen },
  { name: 'Collections', component: TabCollection },
  { name: 'Explore', component: TabNFTAsset },
  { name: 'Profile', component: Profile },
  { name: 'Search', component: SearchScreen },
  { name: 'Scanner', component: ScannerScreen },

  { name: 'AllGates', component: AllGatesScreen },
  { name: 'GateDetail', component: DetailGateScreen },
  { name: 'VideoDetail', component: VideoDetailScreen },
  { name: 'MyNFT', component: MyNFTScreen },
]

function App(): JSX.Element {

  return (
    <Provider store={store} >
      <ToastProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">

            {
              ROUTES.map((item, index) => <Stack.Screen
                key={index}
                name={item.name}
                component={item.component}
                options={{ headerShown: false }}
              />)
            }

          </Stack.Navigator>
        </NavigationContainer>
        </ToastProvider>
    </Provider>
  );
}

export default App;