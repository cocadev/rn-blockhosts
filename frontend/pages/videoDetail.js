import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity, Text } from "react-native";
import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/AntDesign';
import { Video } from 'expo-av';
import { BACKEND_API } from "../config/keys";
import Loading from "../Components/loading";

const { width } = Dimensions.get('window');

const VideoDetailScreen = ({ route, navigation }) => {
  
  const { colors } = useTheme();
  const { uri, title } = route.params;
  const [videoURL, setVideoURL] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onGetVideoURL();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onGetVideoURL = async () => {
    const response = await fetch(`${BACKEND_API}url/assets%2F${uri}`)
    const res = await response.json();
    setVideoURL(res.preSignedUrl);
    setIsLoading(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.f00 }]}>

      <View style={[styles.row, { margin: 3 }]}>
        <TouchableOpacity style={styles.iconBack} onPress={() => navigation.goBack()}>
          <Icon name="left" size={25} color={colors.color2} />
        </TouchableOpacity>
        <Text style={styles.t3}>{title} </Text>
      </View>

      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {isLoading && <Loading />}
        <Video
          source={{ uri: videoURL }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: width, height: 250 }}
        />
      </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconBack: {

  },
  t3: {
    fontSize: 24,
    fontWeight: '700',
    color: '#bbb',
    marginLeft: 12
  },
});

export default VideoDetailScreen;