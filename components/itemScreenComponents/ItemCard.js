import React from "react";
import {
  ScrollView,
  Animated,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import Allergene from "./Allergene";
import { styleOrangeColor } from "../../styles/customStyles";
import imageManager from "../imageManager";

const orangeColor = styleOrangeColor.textOrange.color;

const ItemCard = ({ item }) => {
  return (
    <ScrollView style={styles.container}>
      <Animated.View>
        <View style={{ alignItems: "center" }}>
          {item.image != null && (
            <Image
              style={styles.image}
              source={{
                uri: item.image,
              }}
            />
          )}
          {item.image == null && (
            <Image style={styles.image} source={imageManager.defaultItem} />
          )}

          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.prices}>{item.price} DKK</Text>
        </View>

        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.description}>
            <Text
              style={{ fontSize: 24, fontWeight: "bold", color: "#ff4b3a" }}
            >
              {"Description \n"}
            </Text>
            <View style={styles.readmoreContainer}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
          </Text>
          <View>
            <Allergene allergenes={item.allergenes} />
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
    padding: 20,
    marginHorizontal: 20,
    height: Dimensions.get("screen").height - 180,
  },
  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    marginLeft: 15,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.0,
  },
  name: {
    fontSize: 48,
    fontWeight: "bold",
    color: orangeColor,
  },
  text: {
    color: orangeColor,
  },
  prices: {
    color: orangeColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: orangeColor,
    fontSize: 24,
  },
  descriptionText: {
    flexShrink: 1,
    color: orangeColor,
    fontSize: 20,
  },
  readmoreContainer: {
    flexDirection: "row",
    width: Dimensions.get("screen").width - 100,
    marginBottom: 20,
  },
  readmoreAndLessbtnStyle: {
    color: orangeColor,
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.9,
  },
});

export default ItemCard;
