import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Dimensions,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DATA from "../assets/data.json";

const SubMenu = (props) => {
  const renderItem = ({ item }) => (
    <TouchableHighlight>
      <View>
        <Text style={SubMenuItemStyle.title}>{item.title}</Text>
        <Image source={{ uri: item.image }} style={SubMenuItemStyle.image} />
      </View>
    </TouchableHighlight>
  );
  console.log("submenu rendered");
  const dimensions = Dimensions.get("window");
  const screenWidth = dimensions.width;
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal={true}
      style={{
        width: screenWidth,
      }}
    />
  );
};

const SubMenuItemStyle = StyleSheet.create({
  image: {
    borderRadius: 20,
    width: 100,
    height: 100,
    marginLeft: 15,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
  },
});

export default SubMenu;
