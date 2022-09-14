import React, { useState, createRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  useColorScheme,
} from "react-native";
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

import {
  useMoralis,
} from "react-moralis";
import { useWalletConnect } from "../WalletConnect";
import LinearButton from "../Components/LinearButton";


const LoginScreen = ({ navigation }) => {

  const { colors } = useTheme();
  const scheme = useColorScheme();
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const [errortext, setErrortext] = useState("");
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  const handleCryptoLogin = () => {

    authenticate({ 
      connector,
      // provider: "walletconnect",
      // mobileLinks: ["metamask"],
      signingMessage: "Metasalt authentication",
    })
      .then((res) => {

        if (authError) {
          setErrortext(authError.message);
          setVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.navigate("Home");
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    isAuthenticated && navigation.navigate("Home");
  }, [isAuthenticated]);

  return (
    <Provider>
      <View style={[styles.mainBody, { backgroundColor: colors.primary}]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}>
          <Image
            style={{ flex: 0.7, marginTop: 20 }}
            source={{
              uri:
                "https://metasalt.vercel.app/img/misc/nft.png",
            }}
          />
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView enabled>
              <View style={{ alignItems: "center", backgroundColor: colors.primary }}>
                <Image
                  source={scheme !== 'light' ? require('../black-logo.png') : require('../moralis-logo.png')}
                  style={{
                    width: "80%",
                    height: 100,
                    resizeMode: "contain",
                    margin: 30,
                    backgroundColor: colors.primary
                  }}
                />
              </View>

              <View>
                {authError && (
                  <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                      <Dialog.Title>Authentication error:</Dialog.Title>
                      <Dialog.Content>
                        <Paragraph>
                          {authError ? authError.message : ""}
                        </Paragraph>
                      </Dialog.Content>
                      <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                      </Dialog.Actions>
                    </Dialog>
                  </Portal>
                )}
                {isAuthenticating && (
                  <ActivityIndicator animating={true} color={"white"} />
                )}
              </View>

              <View style={{ margin: 20, marginTop: 40}}>
                <LinearButton title="Connect wallet" onClick={handleCryptoLogin}/>
              </View>
           
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});
