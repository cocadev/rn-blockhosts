import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";

export default function CustomHeader({navigation, title}) {

  return (
    <View style={styles.viewContainer}>
      <View>
        <Text style={{color: '#9E9E9E'}}>Hello again</Text>
        <Text style={{fontSize: 24, fontWeight: '700', lineHeight: 27}}>{title || 'David Robinson'}</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Image source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRSH1b36fzoEmkHaGdCizu25wFLTcj5weH9xRgOHRAnwLMPvr1Rs9GcYNM8_-b5bKtsNA&usqp=CAU'}} style={styles.logo}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginTop: 8,
    height: 70,
  },
  logo: {
    height: 60,
    width: 60,
    borderRadius: 8
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  }
});