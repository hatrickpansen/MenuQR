import React, { useRef, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from "react-native";
import Allergene from "../components/itemScreenComponents/Allergene";

import { useNavigation } from "@react-navigation/core";
import ItemCard from "../components/itemScreenComponents/ItemCard";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { styleOrangeColor } from "../styles/customStyles";
import LoadingIndicator from "../components/LoadingIndicator";
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const orangeColor = styleOrangeColor.textOrange.color;
import Url from "../assets/Url";
const baseUrl = Url.url.url;

function wp(percentage) {
  const value = (percentage * ScreenWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(85);

var sliderRef;
const ItemScreen = ({ route }) => {
  const { id, restId } = route.params;
  const [activeItemId, setActiveItemId] = useState(id);
  const restaurantID = restId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  var abortController = new AbortController();
  var abortSignal = abortController.signal;

  const abort = () => {
    setTimeout(() => {
      abortController.abort();
      setErrorMessage("Can't contact Server");
    }, 5000);
  };

  const fetchData = async (restId) => {
    abort();
    const resp = await fetch(baseUrl + "/items/" + restaurantID, {
      abortSignal,
    });
    const data = await resp.json();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function carouselRender({ item, index }) {
    return <ItemCard item={item} />;
  }
  return (
    <View style={ItemScreenStyle.carouselContainer}>
      {loading && (
        <View style={ItemScreenStyle.loadingContainer}>
          <LoadingIndicator></LoadingIndicator>
          <Text style={{ color: orangeColor }}>{errorMessage}</Text>
        </View>
      )}
      <Carousel
        ref={(c) => {
          sliderRef = c;
        }}
        data={data}
        renderItem={carouselRender}
        sliderWidth={ScreenWidth}
        itemWidth={slideWidth}
        loop={false}
        firstItem={activeItemId}
        onSnapToItem={(index) => {
          setActiveItemId(index);
        }}
        inactiveSlideOpacity={0.1}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeItemId}
        dotColor={orangeColor}
        inactiveDotColor="#000"
        inactiveDotOpacity={0.2}
        dotStyle={{
          width: 12,
          height: 12,
          borderRadius: 6,
          marginHorizontal: 1,
        }}
        carouselRef={sliderRef}
        tappableDots={!!sliderRef}
      />
    </View>
  );
};

const ItemScreenStyle = StyleSheet.create({
  carouselContainer: {
    paddingTop: ScreenHeight * 0.1,
    flex: 1,
    width: ScreenWidth,
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
// add shadow to image using shadowopacity and stuff
export default ItemScreen;
