import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  button,
  SafeAreaView,
  Platform,
} from "react-native";
import ItemEditCard from "../components/authComponents/ItemEditCard";
import LoadingIndicator from "../components/LoadingIndicator";
import Url from "../assets/Url";
import { styleOrangeColor } from "../styles/customStyles";
const baseUrl = Url.url.url;
const orangeColor = styleOrangeColor.textOrange.color;

const ItemEditScreen = ({ route }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = route.params;
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const resp = await fetch(baseUrl + "/item/" + id);
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <LoadingIndicator></LoadingIndicator>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <ItemEditCard item={data}></ItemEditCard>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default ItemEditScreen;
