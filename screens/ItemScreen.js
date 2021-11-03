import React, {useState} from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
} from "react-native";
import Allergene from "../components/Allergene";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import data from "../assets/data.json"

const ItemScreen = ({ route }) => {
  const {id, name, description, image, price, restId } = route.params;
  const [dynId, setDynId] = useState(id);
  const [dynName, setDynName] = useState(name);
  const [dynDesc, setDynDesc] = useState(description);
  const [dynImage, setDynImage] = useState(image);
  const [dynPrice, setDynPrice] = useState(price);

  //console.log(dynId);
  const restaurantID = restId
  const items = data.filter(element => element.restId==restaurantID)
  var ids = []
  items.forEach(element => {
    //console.log(element["id"])
    ids.push(element["id"])
  });

  //console.log(items);
  const onSwipeLeft = () => {
    alert("swipe left!");
    setDynId(ids[(dynId +1) %ids.length]);
    console.log(dynId);
    loadNewItem(dynId);
  }
  const onSwipeRight = () => {
    if(dynId > 0){
      alert("swipe right!");
      setDynId(ids[(dynId - 1) %ids.length]);
      console.log(dynId);
      loadNewItem(dynId);
    } else if (dynId == 0){
      alert("swipe right!");
      setDynId(ids[ids.length-1]);
      console.log(dynId);
      loadNewItem(dynId);
    }
  }

  function loadNewItem(id){
    const item = items.filter(element => element.id==id)[0];
    setDynName(item.name);
    setDynPrice(item.price);
    setDynDesc(item.description);
    setDynImage(item.image);
  }
  return (
    <GestureRecognizer
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
        >
    <SafeAreaView>
      
        <View style={{ alignItems: "center" }}>
        
            <Image source={{ uri: dynImage }} style={ItemScreenStyle.image}></Image>
          
          <Text style={ItemScreenStyle.name}>{dynName}</Text>
          <Text style={ItemScreenStyle.prices}>{dynPrice} DKK</Text>
        </View>
        
      <View style={{ paddingLeft: 10 }}>
        <Text style={ItemScreenStyle.description}>
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ff4b3a" }}>
            {"Description \n"}
          </Text>
          {dynDesc}
        </Text>
        <Allergene id={dynId}/>
      </View>
    </SafeAreaView>
    </GestureRecognizer>
  ) 
};

const ItemScreenStyle = StyleSheet.create({
  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    marginLeft: 15,
    marginBottom: 5,
  },
  name: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#ff4b3a",
  },
  text: {
    color: "#ff4b3a",
  },
  prices: {
    color: "#ff4b3a",
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: "#ff4b3a",
    fontSize: 24,
  },
});

// add shadow to image using shadowopacity and stuff
export default ItemScreen;
