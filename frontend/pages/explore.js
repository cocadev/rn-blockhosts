import React, { useMemo, useState } from "react";
import { View, StyleSheet, Text, ScrollView, TextInput } from "react-native";
import CustomHeader from '../Components/CustomHeader';
import { useTheme } from "react-native-paper";

const TabNFTAsset = ({ navigation }) => {

  const { colors } = useTheme();

  return (
    <View style={styles.root}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} />
        <Text style={[styles.description]}>Marketplace</Text>

        <View></View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
  },
  
});

export default TabNFTAsset;
