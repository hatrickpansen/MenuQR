import React from "react";
import { Image, SafeAreaView, ScrollView, Text } from "react-native";

const ItemScreen = ({ route }) => {
  const { name, description, image } = route.params;
  return (
    <SafeAreaView>
      <Image
        source={{ uri: image }}
        style={{ width: 100, height: 100 }}
      ></Image>
      <Text>{name}</Text>
      <Text>{description}</Text>
    </SafeAreaView>
  );
};

export default ItemScreen;
