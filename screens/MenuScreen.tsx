import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import SubMenu from "../components/SubMenu";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import RestaurantsData from "../components/browseRestaurants/placeholderDataRestaurants.json"

// const ItemScreen = ({ route }) => {
//     const { name, description, image, price } = route.params;


const MenuScreen = ({route}: any) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  //   const { id, title, address, openingHours} = route.params;

  return (
    <View style={tw.style(`items-center pt-8`)}>
        <View style={tw.style(`items-center`)}>
            <Text
                style={tw.style(`pt-2`, styleOrangeColor.titleOrange)}
            >
                Restaurant
            </Text>
            <Text>
                Opening hours:
            </Text>
            <Text>
                Address:
            </Text>
            <View>
                <View style={tw`flex-row justify-between`}>
                    <TouchableOpacity>
                        <View style={tw.style(`border-b-2 border-gray-900 p-4`)}>
                            <Text style={tw.style(`text-xl font-medium`)}>
                                Food
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={tw.style(`border-b-2 border-gray-900 p-4`)}>
                            <Text style={tw.style(`text-xl font-medium`)}>
                                Drinks
                            </Text>
                        </View>

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={tw.style(`border-b-2 border-gray-900 p-4`)}>
                            <Text style={tw.style(`text-xl font-medium`)}>
                                Sauce
                            </Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        </View>

        {/*renderItem={MenuScreen}*/}
      <SubMenu></SubMenu>
    </View>
  );
};



export default MenuScreen;

