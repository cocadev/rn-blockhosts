import React, { useState } from 'react';
import { useMoralis, useMoralisQuery } from 'react-moralis';
import { StyleSheet, View, Text, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import Loading from '../Components/loading';
import LinearButton from '../Components/LinearButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../Components/CustomHeader';
import { useTheme } from 'react-native-paper';

const TabCollection = ({ navigation }) => {

  const { colors } = useTheme();
  const { isAuthenticated } = useMoralis();
  const [trigger, setTrigger] = useState(1);
  const { data: collections, isLoading } = useMoralisQuery("Brands", query => query.descending("createdAt"), [trigger], { autoFetch: true });

  const onRefresh = () => {
    setTrigger(trigger + 1);
  }

  const renderItem = ({ item }) => {

    const user_avatar = item.attributes.avatar || DEMO_AVATAR;
    const banner = item.attributes.banner || DEMO_AVATAR;
    const title = item.attributes.title;
    const description = item.attributes.description;

    return (
      <View style={[styles.itemContainer, { backgroundColor: colors.primary3}]}>
        <TouchableOpacity
          onPress={() => navigation.navigate("CollectionDetail", {
            collectionId: item.id,
          })}
        >
          <Image
            source={{ uri: banner }}
            style={styles.logo}
          />
        </TouchableOpacity>

        <View style={styles.view}>

          <Image source={{ uri: user_avatar }} style={styles.avatar} />

          <Text style={[styles.title, { color: colors.color3}]}>{title}</Text>

          <View style={styles.row}>
            <View style={{ marginLeft: 6, flex: 1 }}>
              <Text style={[styles.name, { color: colors.color2}]}> {description}</Text>
            </View>
          </View>

        </View>
      </View>
    );
  };


  return (
    <View style={[styles.root, { backgroundColor: colors.primary}]}>
      <ScrollView style={{ paddingHorizontal: 12 }}>

        <CustomHeader navigation={navigation} />

        <Text style={[styles.t2, { color: colors.color7}]}>Explore Collectibles</Text>

        <Text style={[styles.description, { color: colors.color7}]}>The way we value internet-native items is changing with the development of blockchain technology. Kittens, punks, and memes are now trading digital wallets for cryptocurrencies, and the online collectibles market is taking shape before our eyes.</Text>

        <View style={styles.row2}>
          <LinearButton
            title='Create New Collection'
            onClick={() => navigation.navigate(isAuthenticated ? "CreateCollection" : "Auth")}
          />
          <TouchableOpacity style={styles.btn} onPress={onRefresh}>
            <Ionicons name="refresh" size={24} color={colors.text}/>
          </TouchableOpacity>
        </View>

        {!isLoading && collections.length > 0 ?
          <FlatList
            style={[styles.assetsViewer, { color: colors.primary}]}
            scrollEnabled={true}
            data={collections}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          /> : <Loading />}

      </ScrollView>
    </View>
  )
}

export default TabCollection;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  itemContainer: {
    marginTop: 16,
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5
  },
  t2: {
    padding: 10,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '700',
  },
  description: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '400',
  },
  title: {
    fontSize: 24,
    color: "#222",
    fontWeight: "700",
    lineHeight: 32,
    marginTop: 5
  },
  name: {
    fontSize: 15,
    color: "#414a4c",
    fontWeight: "500",
  },
  logo: {
    height: 160,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#223',
  },
  assetsViewer: {
    borderRadius: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
  },
  view: {
    marginTop: -50,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  btn: {
    borderWidth: 2,
    borderColor: '#3a25f9',
    height: 58,
    marginTop: 12,
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12
  },

});
