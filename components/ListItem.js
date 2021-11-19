import React, { useState, useEffect } from "react";
import {
  TouchableHighlight,
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import EditIcon from "./authComponents/EditIcon";
import imageManager from "./imageManager";
import VisibleBtn from "./authComponents/VisibleBtn";

const ListItem = ({ item, editMode, callback }) => {
  const navigation = useNavigation();
  const [editState, setEditState] = useState(editMode);
  useEffect(() => {
    setEditState(editMode);
  });

  function callbackEdit(childData) {
    navigation.navigate("ItemEdit", {
      id: item.id,
    });
  }
  function callbackVisible(childData) {
    item.visible = childData.isVisible;
    callback({ id: item.id, visible: item.visible });
  }

  return (
    <TouchableOpacity
      style={ListItemStyle.card}
      onPress={() => {
        navigation.navigate("Item", {
          id: item.id,
          restId: item.restId,
        });
      }}
    >
      {item.image != null && (
        <Image
          style={ListItemStyle.image}
          source={{
            uri: item.image,
          }}
        />
      )}
      {item.image == null && (
        <Image style={ListItemStyle.image} source={imageManager.defaultItem} />
      )}
      <View style={ListItemStyle.textAndEditBtnContainer}>
        <View>
          <Text style={ListItemStyle.title}>
            {item.name}{" "}
            <Text style={ListItemStyle.price}>{item.price} DKK</Text>
          </Text>
          <Text style={ListItemStyle.description}>{item.description}</Text>
        </View>
        <View style={ListItemStyle.editBtnContainer}>
          <View style={{ padding: 5 }}>
            <EditIcon
              style={ListItemStyle.edit}
              size={24}
              editMode={editState}
              itemData={item}
              callback={callbackEdit}
            />
          </View>
          <View style={{ padding: 5 }}>
            <VisibleBtn
              callback={callbackVisible}
              visible={item.visible}
              editMode={editState}
            ></VisibleBtn>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ListItemStyle = StyleSheet.create({
  image: {
    borderRadius: 20,
    width: 100,
    height: 100,
    margin: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4b3a",
  },
  price: {
    fontSize: 18,
    opacity: 0.7,
  },
  description: {
    fontSize: 14,
    opacity: 0.8,
    fontStyle: "italic",
    color: "#ff4b3a",
  },
  card: {
    flexDirection: "row",
    paddingTop: 5,
    // paddingLeft: -8,
    marginBottom: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderRadius: 12,
    //margin: 12,
  },
  textAndEditBtnContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  editBtnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 20,
  },
});

export default ListItem;
