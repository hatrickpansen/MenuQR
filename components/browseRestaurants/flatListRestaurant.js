import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../../styles/customStyles";
import Svg, { Path } from "react-native-svg";
import React, { useRef } from "react";

const SPACING = 1;
const AVATAR_SIZE = 160;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const FlatListRestaurant = ({ item, index, scrollY, navigation }) => {
  const getItem = (item) => {
    // Function for click on an item
    navigation.navigate("Menu"); //navigation testing get item
    alert("Id : " + item.id + " Title : " + item.title);
  };

  const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];

  const scale = scrollY.interpolate({
    inputRange: inputRange,
    outputRange: [1, 1, 1, 0],
  });

  //opacity animation
  const opacityInputRange = [
    -1,
    0,
    ITEM_SIZE * index,
    ITEM_SIZE * (index + 0.9),
  ];

  const opacity = scrollY.interpolate({
    inputRange: opacityInputRange,
    outputRange: [1, 1, 1, 0],
  });

  return (
    <Animated.View
      style={tw.style(
        {
          padding: SPACING,
          opacity: opacity,
          transform: [{ scale }],
        },
        `bg-gray-100`
      )}
      /* style={tw.style(
              {
                padding: SPACING,
                transform: [{ scale }],
              },
              `bg-gray-100`
            )}*/
    >
      <TouchableOpacity onPress={() => getItem(item)}>
        <View style={tw`py-2 px-2 bg-gray-100`}>
          <View
            style={tw`flex bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-300`}
          >
            <View>
              <Image
                style={{ width: "100%", height: 100 }}
                source={require("../../assets/food1.jpg")}
                resizeMode="cover"
                resizeMethod="resize"
              />
            </View>
            <View style={tw`flex-row justify-between p-3 items-center`}>
              <Text
                style={tw.style(`font-medium`, styleOrangeColor.textOrange)}
              >
                {item.title}
              </Text>
              <View style={tw`flex-row items-center`}>
                <Svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM9 8.625C7.965 8.625 7.125 7.785 7.125 6.75C7.125 5.715 7.965 4.875 9 4.875C10.035 4.875 10.875 5.715 10.875 6.75C10.875 7.785 10.035 8.625 9 8.625Z"
                    fill="#FF470B"
                  />
                </Svg>
                <Text style={tw.style(`font-medium pl-1`)}>{item.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FlatListRestaurant;
