import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import SplashScreen from "./pages/splash";
import HomeScreen from "./pages/auth";
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
import CreateProfileScreen from "./pages/createProfile";
import MarketplacePage from "./pages/marketplace";
import EditProfileScreen from "./pages/editProfile";
import ShareScreen from "./pages/share";
import ReceiveTokenScreen from "./pages/receiveToken";
import {TestScreen, Web3AuthScreen} from "./pages/web3Auth";



import { Provider } from 'react-redux';
import store from "./store/store";
import { ToastProvider } from 'react-native-toast-notifications'
import DetailNFTScreen from "./pages/detailNFT";
import ExploreScreen from "./pages/explore";
import AuthScreen from "./pages/auth";
const Moralis = require('moralis/react-native.js');
const AsyncStorage = require('react-native').AsyncStorage;
Moralis.setAsyncStorage(AsyncStorage);

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const ROUTES = [
  { name: 'SplashScreen', component: SplashScreen },
  { name: 'auth', component: AuthScreen },
  { name: 'Home', component: ExploreScreen },

  { name: 'CreateProfile', component: CreateProfileScreen },
  { name: 'Marketplace', component: MarketplacePage },
  { name: 'MyToken', component: MyTokensScreen },
  { name: 'EditProfile', component: EditProfileScreen },
  { name: 'Share', component: ShareScreen },
  { name: 'ReceiveToken', component: ReceiveTokenScreen },
  { name: 'Detail', component: DetailNFTScreen },
  { name: 'Web3Auth', component: Web3AuthScreen },
  
  { name: 'NFTDetail', component: NFTDetailScreen },
  { name: 'NFTOwner', component: NFTOwnerScreen },
  { name: 'CollectionDetail', component: DetailCollectionScreen },
  { name: 'CreateCollection', component: CreateCollectionScreen },
  { name: 'CreateBrand', component: CreateBrandScreen },
  { name: 'Collections', component: TabCollection },
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
          <Stack.Navigator initialRouteName="SplashScreen">

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