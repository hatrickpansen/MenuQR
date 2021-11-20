import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
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
  ProgressBarAndroidBase,
  TouchableOpacity,
} from "react-native";
import Allergene from "../components/itemScreenComponents/Allergene";

import { useNavigation } from "@react-navigation/core";
import ItemCard from "../components/itemScreenComponents/ItemCard";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { styleOrangeColor } from "../styles/customStyles";
import LoadingIndicator from "../components/LoadingIndicator";
import fetchAvailableItems from "../assets/fetchMethods/fetchAvailableItems";
const ScreenWidth = Dimensions.get("window").width;
const ScreenHeight = Dimensions.get("window").height;
const orangeColor = styleOrangeColor.textOrange.color;
import Url from "../assets/Url";
import tw from "tailwind-react-native-classnames";
import dimensions from "react-native-web/dist/exports/Dimensions";
const baseUrl = Url.url.url;

function wp(percentage) {
  const value = (percentage * ScreenWidth) / 100;
  return Math.round(value);
}

const slideWidth = wp(85);

const ItemScreen = ({ route }) => {
  const carouselRef = useRef(null);
  const { id, restId } = route.params;
  console.log("id on first item: " + id);

  const [activeItemId, setActiveItemId] = useState(id);
  console.log("active item id: " + activeItemId);
  const restaurantID = restId;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [idPairs, setIdPairs] = useState([]);
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
    const data = await fetchAvailableItems(restId, abortSignal);
    setData(data);
    setIdPairs(pairIds(data));
    setLoading(false);
  };

  useLayoutEffect(() => {
    fetchData(restId);
    console.log("caruosel ref index: " + carouselRef.currentIndex);
  }, []);

  function pairIds(data) {
    let pairs = [];
    for (let i = 0; i < data.length; i++) {
      pairs.push(data[i].id);
    }
    console.log("idPairs " + pairs);
    return pairs;
  }
  function getCaruselId(id) {
    for (let i = 0; i < idPairs.length; i++) {
      if (id == idPairs[i]) {
        console.log("getting caruosel id : " + i);
        return i;
      }
    }
  }
  function getItemId(caruoselId) {
    console.log("on item id: " + idPairs[caruoselId]);
    return idPairs[caruoselId];
  }
  function carouselRender({ item, index }) {
    return <ItemCard item={item} />;
  }

  const CarouselPaginationBar = (props) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.carouselRef.current.snapToItem(props.index);
        }}
      >
        <View
          style={tw`rounded-full`}
          width={props.width}
          marginHorizontal={6}
          height={props.width}
          backgroundColor={props.inactive ? "rgba(0, 0, 0, 0.20)" : orangeColor}
        />
      </TouchableOpacity>
    );
  };

  const getPagination = () => (
    <Pagination
      dotsLength={data.length}
      activeDotIndex={getCaruselId(activeItemId)}
      containerStyle={{
        /*backgroundColor: "white",*/
        paddingVertical: 4,
        paddingHorizontal: 10,
      }}
      tappableDots={true}
      dotElement={
        <CarouselPaginationBar width={width / 20} carouselRef={carouselRef} />
      }
      inactiveDotElement={
        <CarouselPaginationBar
          width={width / 24}
          carouselRef={carouselRef}
          inactive
        />
      }
    />
  );

  const { height, width } = Dimensions.get("screen");

  return (
    <View style={{ height: Dimensions.get("screen").height }}>
      {loading ? (
        <View style={ItemScreenStyle.loadingContainer}>
          <LoadingIndicator />
          <Text style={{ color: orangeColor }}>{errorMessage}</Text>
        </View>
      ) : (
        <View>
          <Carousel
            contentContainerCustomStyle={{ marginTop: 60, marginBottom: 35 }}
            ref={carouselRef}
            data={data}
            renderItem={carouselRender}
            sliderWidth={width}
            itemWidth={width}
            slideStyle={{
              width: width,
            }}
            loop={false}
            firstItem={getCaruselId(activeItemId)}
            onSnapToItem={(index) => {
              console.log("on snap index: " + index);
              setActiveItemId(getItemId(index));
            }}
          />
          {getPagination()}
        </View>
      )}
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
