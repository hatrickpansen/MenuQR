import React from "react";
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

const ListItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {
            name: item.name,
            description: item.description,
            image: item.image,
          });
        }}
      >
        <Image source={{ uri: item.image }} style={ListItemStyle.image} />
      </TouchableOpacity>
      <Text>
        {item.name} {item.description}
      </Text>
      <Text style={ListItemStyle.title}>{item.price}$</Text>
    </View>
  );
};

const ListItemStyle = StyleSheet.create({
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

export default ListItem;
