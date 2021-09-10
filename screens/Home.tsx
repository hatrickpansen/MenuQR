import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const Home = () => {
  return (
    <ScrollView>
      <Text style={style.title}>MenuQR</Text>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 76,
    textAlign: "center",
    color: "#000",
  },
});

export default Home;
