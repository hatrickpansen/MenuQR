import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, StyleSheet, View } from "react-native";
import imageManager from "../imageManager";
import { styleOrangeColor } from "../../styles/customStyles";
import ModalDropdown from "react-native-modal-dropdown";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";

const PlusBtn = ({ isEditMode, restId }) => {
  const [isVisible, setIsVisible] = useState(isEditMode);
  const navigation = useNavigation();
  useEffect(() => {
    setIsVisible(isEditMode);
  });

  if (!isVisible) {
    return <View></View>;
  } else if (isVisible) {
    return (
      <View>
        <ModalDropdown
          style={{ padding: 5 }}
          dropdownTextStyle={styles.dropDownText}
          dropdownStyle={styles.dropDown}
          options={["Add Dish", "Add category"]}
          dropdownTextHighlightStyle={styles.dropDownTextHigh}
          onSelect={(index, value) => {
            if (value == "Add Dish") {
              navigation.navigate("ItemEdit", { isNew: true, restId: restId });
            }
          }}
        >
          <View>
            <Entypo size={40} name="circle-with-plus" color="#0E9594" />
          </View>
        </ModalDropdown>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  image: {
    backgroundColor: "black",
  },
  dropDown: {
    height: "auto",
    marginVertical: -30,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#0E9594",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 20,
  },
  dropDownText: {
    borderRadius: 20,
    marginBottom: 5,
    alignItems: "center",
    fontSize: 20,
  },
  dropDownTextHigh: {},
});

export default PlusBtn;
