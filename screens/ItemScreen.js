import React, {useRef, useEffect, useState} from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet, Animated
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

  
  
  const [fadeAnim, setFadeAnmin] = useState(new Animated.Value(1));
  const [fadeAnim1, setFadeAnmin1] = useState(new Animated.Value(1));
  
  const swipeConfig = {
    velocityThreshold: 0.2,
    directionalOffsetThreshold: 80
  };
  const restaurantID = restId
  const items = data.filter(element => element.restId==restaurantID)
  const [dynAl, setDynAl] = useState(loadFirstAllergenes(id));
  
  var ids = []
  items.forEach(element => {
    ids.push(element["id"])
  });


useEffect(() => {
  fadeInAnimation();
  loadNewItem(dynId);
});

  function swipeLeftAnimation() {
    fadeAnim.setValue(0);
    Animated.timing(
    fadeAnim,
    {
      toValue: -400,
      duration: 300,
      useNativeDriver: false,
    }
  ).start(() => {
    fadeAnim.setValue(0);;
  });
  }
  function fadeInAnimation() {
    fadeAnim1.setValue(0);
    Animated.timing(
    fadeAnim1,
    {
      toValue: 1,
      duration: 800,
      useNativeDriver: false,
    }
  ).start(() => {
  });
  }
  function swipeRightAnimation() {
    fadeAnim.setValue(0);
    Animated.timing(
    fadeAnim,
    {
      toValue: 400,
      duration: 300,
      useNativeDriver: false,
    }
  ).start(() => {
    fadeAnim.setValue(0);;
  });
  }

  const onSwipeLeft = () => {
    swipeLeftAnimation()
    setDynId(ids[(dynId +1) %ids.length]);
  }
  const onSwipeRight = () => {
    if(dynId > 0){
      swipeRightAnimation()
      setDynId(ids[(dynId - 1) %ids.length]);      
    } else if (dynId == 0){
      swipeRightAnimation()
      setDynId(ids[ids.length-1]);      
    }
  }
  function loadFirstAllergenes(id){
    const item = items.filter(element => element.id==id)[0];
    return item.allergenes;
  }
  function loadNewItem(id){
    const item = items.filter(element => element.id==id)[0];
    setDynName(item.name);
    setDynPrice(item.price);
    setDynDesc(item.description);
    setDynImage(item.image);
    setDynAl(item.allergenes);
  }
  return (
    <GestureRecognizer
          onSwipeLeft={onSwipeLeft}
          onSwipeRight={onSwipeRight}
          config={swipeConfig}
        >
    <SafeAreaView>
      <Animated.View style={{ translateX: fadeAnim, opacity: fadeAnim1}}>
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
        <Allergene allergenes={dynAl}/>
      </View>
      </Animated.View>
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
