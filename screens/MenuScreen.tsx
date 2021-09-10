import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import Menu from "../components/Menu";

const MenuScreen = () => {
  return (
    <ScrollView>
      <Menu />
    </ScrollView>
  );
};

export default MenuScreen;
