import React from "react";
import { ScrollView, Text } from "react-native";

const MenuScreen = ({ route, navigation }: any) => {
  const { hello, hi } = route.params;
  return (
    <ScrollView>
      <Text>MenuScreen</Text>
      <Text>hello: {hello}</Text>
      <Text>hi: {hi}</Text>
    </ScrollView>
  );
};

export default MenuScreen;
