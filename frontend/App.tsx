import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import SplashScreen from "./pages/splash";
import NFTDetailScreen from "./pages/detailNFT";
import MyTokensScreen from "./pages/myTokens";
import CreateProfileScreen from "./pages/createProfile";
import MarketplacePage from "./pages/marketplace";
import EditProfileScreen from "./pages/editProfile";
import ShareScreen from "./pages/share";
import ReceiveTokenScreen from "./pages/receiveToken";
import {Web3AuthScreen} from "./pages/web3Auth";
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
  { name: 'Web3Auth', component: Web3AuthScreen },
  { name: 'Home', component: ExploreScreen },
  { name: 'CreateProfile', component: CreateProfileScreen },
  { name: 'Marketplace', component: MarketplacePage },
  { name: 'MyToken', component: MyTokensScreen },
  { name: 'EditProfile', component: EditProfileScreen },
  { name: 'Share', component: ShareScreen },
  { name: 'ReceiveToken', component: ReceiveTokenScreen },
  { name: 'Detail', component: DetailNFTScreen },
  { name: 'NFTDetail', component: NFTDetailScreen },
]

function App(): JSX.Element {

  return (
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
  );
}

export default App;