import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, FlatList, Dimensions, View, Image } from "react-native";
import DATA from "../assets/data.json";
import ListItem from "./ListItem";
import Svg, { Path } from "react-native-svg";
import tw from "tailwind-react-native-classnames";

const { width, height } = Dimensions.get("screen");

const BackButton = (props) => {
    const dimensions = Dimensions.get("window");
    const screenWidth = dimensions.width;
    return (
        // <TouchableOpacity onPress={"window.history.back()"}>
        //     {/*<button onClick="window.history.back()">Back</button>*/}
        //     <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <Path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        //     </Svg>
        // </TouchableOpacity>
        <View>
            <Svg
                width="30"
                height="30"
                viewBox="0 0 8 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <Path d="M7 13L1 7L7 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>

        </View>
    );
}

export default BackButton;

