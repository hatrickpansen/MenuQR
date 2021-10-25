import React from "react";
import { View, ScrollView, Text, StyleSheet, Image } from "react-native";

const RestaurantCard = () => {
  return (
    <View>
      <Text>⭐ Featured Restaurants </Text>
      <ScrollView horizontal={true} style={scrollStyle.card}>
        <Image
          source={{
            uri: "https://imgix.bustle.com/2017/2/23/19aaee7e-1295-472c-9edd-d55e4a790b0c.jpg?w=800&fit=crop&crop=faces&auto=format%2Ccompress",
          }}
          style={{ width: 60, height: 60 }}
        />
        <Image
          source={{
            uri: "https://imgix.bustle.com/2017/2/23/19aaee7e-1295-472c-9edd-d55e4a790b0c.jpg?w=800&fit=crop&crop=faces&auto=format%2Ccompress",
          }}
          style={{ width: 60, height: 60 }}
        />
        <Image
          source={{
            uri: "https://imgix.bustle.com/2017/2/23/19aaee7e-1295-472c-9edd-d55e4a790b0c.jpg?w=800&fit=crop&crop=faces&auto=format%2Ccompress",
          }}
          style={{ width: 60, height: 60 }}
        />
      </ScrollView>
    </View>
  );
};

const scrollStyle = StyleSheet.create({
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
  },
});

export default RestaurantCard;
