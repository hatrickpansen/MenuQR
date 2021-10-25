import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";

const Item = () => {
  // AM I EVEN USING THIS CAUSE I DONT THINK SO
  return (
    <View>
      <View>
        <Text>{item.title}</Text>
        <Text>{"Price \n" + item.price} </Text>
      </View>
      <View>
        <Text>{"Description \n" + item.description}</Text>
      </View>
      <View>
        <Text>Allergens</Text>
      </View>
    </View>
  );
};

// description fontWeight bold fontsize 24
