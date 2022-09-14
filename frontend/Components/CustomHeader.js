import React, { useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, useColorScheme } from "react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalMenu from './ModalMenu';
import { useTheme } from "react-native-paper";

export default function CustomHeader({navigation, disableSearch}) {

  const [ isOpen, setIsOpen ] = useState(false);
  const { colors } = useTheme();
  const scheme = useColorScheme();

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
        <Image source={require('../black-logo.png')} style={styles.logo}/>
      </TouchableOpacity>
      {/* <View style={styles.right}>
        {!disableSearch && <TouchableOpacity onPress={()=>navigation.navigate('Search')} style={{ marginRight: 16}}>
          <Ionicons name="search-outline" size={23} color={colors.color6} />
        </TouchableOpacity>}
        <TouchableOpacity onPress={()=>setIsOpen(true)}>
          <SimpleLineIcons name="menu" size={22} color={colors.color6} /> 
        </TouchableOpacity>
      </View>

      { isOpen && <ModalMenu onClose={()=>setIsOpen(false)} navigation={navigation}/>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    // paddingHorizontal: 10,
  },
  logo: {
    height: 20,
    width: 200
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  }
});