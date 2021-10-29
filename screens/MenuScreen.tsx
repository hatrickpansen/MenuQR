import React from "react";
import { View, Text } from "react-native";
import SubMenu from "../components/SubMenu";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import RestaurantsData from "../components/browseRestaurants/placeholderDataRestaurants.json"

// const ItemScreen = ({ route }) => {
//     const { name, description, image, price } = route.params;


const MenuScreen = ({route}: any) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  //   const { id, title, address, openingHours} = route.params;
    // return(
    // <View>
    //     <Text
    //         style={tw.style(`pt-2`, styleOrangeColor.titleOrange)}
    //     >
    //         {title}
    //     </Text>
    //     <Text>
    //         Opening hours: {openingHours}
    //     </Text>
    //     <Text>
    //         Address:
    //     </Text>
    // </View>
    // )

  return (
    <View style={tw.style(`items-center`)}>
        <View style={tw.style(`items-center`)}>
            <Text
                style={tw.style(`pt-2`, styleOrangeColor.titleOrange)}
            >
                Resaurant
            </Text>
            <Text>
                Opening hours:
            </Text>
            <Text>
                Address:
            </Text>
        </View>

        {/*renderItem={MenuScreen}*/}
      <SubMenu></SubMenu>
    </View>
  );
};

export default MenuScreen;

