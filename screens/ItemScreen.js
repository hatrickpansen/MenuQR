import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Allergene from "../components/Allergene";

const ItemScreen = ({ route }) => {
  const {id, name, description, image, price } = route.params;
  return (
    <SafeAreaView>
      <View style={{ alignItems: "center" }}>
        <Image source={{ uri: image }} style={ItemScreenStyle.image}></Image>
        <Text style={ItemScreenStyle.name}>{name}</Text>
        <Text style={ItemScreenStyle.prices}>{price} DKK</Text>
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Text style={ItemScreenStyle.description}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ff4b3a" }}>
            {"Description \n"}
          </Text>
          {description}
        </Text>
        <Allergene id={id}/>
      </View>
    </SafeAreaView>
  );
};

const ItemScreenStyle = StyleSheet.create({
  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    marginLeft: 15,
    marginBottom: 5,
  },
  name: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#ff4b3a",
  },
  text: {
    color: "#ff4b3a",
  },
  prices: {
    color: "#ff4b3a",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#ff4b3a",
    fontSize: 24,
  },
});

// add shadow to image using shadowopacity and stuff
export default ItemScreen;
