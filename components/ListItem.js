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
    <View style={ListItemStyle.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Item", {
            name: item.name,
            description: item.description,
            image: item.image,
            price: item.price,
          });
        }}
      >
        <Image source={{ uri: item.image }} style={ListItemStyle.image} />
      </TouchableOpacity>
      <View>
        <Text style={ListItemStyle.title}>
          {item.name} <Text style={ListItemStyle.price}>{item.price} DKK</Text>
        </Text>
        <Text style={ListItemStyle.description}>{item.description}</Text>
      </View>
    </View>
  );
};

const ListItemStyle = StyleSheet.create({
  image: {
    borderRadius: 20,
    width: 100,
    height: 100,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4b3a",
  },
  price: {
    fontSize: 18,
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    fontStyle: "italic",
    color: "#ff4b3a",
  },
  card: {
    flexDirection: "row",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    borderRadius: 12,
    // flexWrap: "wrap",  # this is fucky but the text wont wrap properly and goes outside the screen
  },
});

export default ListItem;
