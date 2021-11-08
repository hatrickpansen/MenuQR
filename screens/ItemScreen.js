import React, { useRef, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet, Animated, Dimensions
} from "react-native";
import Allergene from "../components/Allergene";
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import data from "../assets/data.json";
import { useNavigation } from "@react-navigation/core";
import ReadMore from '@fawazahmed/react-native-read-more';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {styleOrangeColor} from "../styles/customStyles"
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const orangeColor = styleOrangeColor.textOrange.color

function wp (percentage) {
  const value = (percentage * ScreenWidth) / 100;
  return Math.round(value);
}

const slideHeight = ScreenHeight * 0.36;
const slideWidth = wp(85);
const itemHorizontalMargin = wp(2);
var sliderRef;
const ItemScreen = ({ route }) => {
  const { id, name, description, image, price, restId } = route.params;
  const [activeItemId, setActiveItemId] = useState(id);
  const [reset, setReset] = useState(false);
  const restaurantID = restId
  const items = data.filter(element => element.restId == restaurantID)
  const isActiveA = () => {
    let arr = [];
    for(let i = 0; i< items.length; i++){
      arr.push({id: items[i].id, isActive: false});
    }
    return arr;
  } 
  const [isActiveArr, setIsActiveArr] = useState(isActiveA)
  useEffect(()=> {
    /* console.log("reload");
    console.log(activeItemId); */
    
  })
  function updateIsActiveArr(activeId){
      let arr = [];
      for(let i = 0; i<isActiveArr.length; i++){
        if(isActiveArr[i].id == activeId){
          arr.push({isActive: true, id: isActiveArr[i].id})
          
        } else {
          arr.push({isActive: false, id: isActiveArr[i].id})
        }
      }
      /* console.log(arr) */
      return arr;
  }
  function carouselRender({item, index}){
    let ind = 0;
    for(let i = 0; i<isActiveArr.length; i++){
      if(isActiveArr[i].id == item.id){
        ind = isActiveArr[i].id
      }
    }
    return ( <ItemCard item={item} isActive={isActiveArr[ind].id}/>
      /* <ScrollView style={ItemScreenStyle.container}>
        <Animated.View>
          <View style={{ alignItems: "center" }}>

            <Image source={{ uri: item.item.image }} style={ItemScreenStyle.image}></Image>

            <Text style={ItemScreenStyle.name}>{item.item.name}</Text>
            <Text style={ItemScreenStyle.prices}>{item.item.price} DKK</Text>
          </View>

          <View style={{ paddingLeft: 10 }}>
            <Text style={ItemScreenStyle.description}>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ff4b3a" }}>
                {"Description \n"}
              </Text>
              <View style={ItemScreenStyle.readmoreContainer}>
              <ReadMore numberOfLines={3} style={ItemScreenStyle.descriptionText} seeMoreStyle={ItemScreenStyle.readmoreAndLessbtnStyle} seeLessStyle={ItemScreenStyle.readmoreAndLessbtnStyle}>
                {item.item.description}
              </ReadMore>
              </View>
            </Text>
            <View>
              <Allergene allergenes={item.item.allergenes} reset={reset} />
            </View>
            
          </View>
        </Animated.View>
        </ScrollView> */
        )
  }
  return (
    <View style={ItemScreenStyle.carouselContainer}>

    
    <Carousel
              ref={c => sliderRef = c}
              data={items}
              renderItem={carouselRender}
              sliderWidth={ScreenWidth}
              itemWidth={slideWidth}
              loop={false}
              firstItem={activeItemId}
              onSnapToItem={(index) => {
                setActiveItemId(index);
                setIsActiveArr(updateIsActiveArr(index)); 
              }}
              inactiveSlideOpacity={0.1}
            />
            <Pagination
              dotsLength={items.length}
              activeDotIndex={activeItemId}
              dotColor={orangeColor}
              inactiveDotColor="#000"
              inactiveDotOpacity={0.2}
              dotStyle={
                {
                  width: 12,
                  height: 12,
                  borderRadius: 6,
                  marginHorizontal: 1
              }
              }
              carouselRef={sliderRef}
              tappableDots={true}
            />
            </View>

  )
};

const ItemScreenStyle = StyleSheet.create({
  container: {
    marginTop: 100
  },
  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    marginLeft: 15,
    marginBottom: 5,
  },
  name: {
    fontSize: 48,
    fontWeight: "bold",
    color: orangeColor,
  },
  text: {
    color: orangeColor,
  },
  prices: {
    color: orangeColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: orangeColor,
    fontSize: 24,  
  },
  descriptionText: {
    
    color: orangeColor,
    fontSize: 20, 
  },
  readmoreContainer: {
    flex: 1
  },
  readmoreAndLessbtnStyle: {
    color: orangeColor,
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.9
  },
  carouselContainer: {
    flex: 1,
    width: ScreenWidth,
    justifyContent: "center"
  }
});

const ItemCard = ({item, isActive}) => {
  const [reset, setReset]= useState(!isActive);
  useEffect(()=>{
    setReset(!isActive);
  })
 
  return (
    <ScrollView style={ItemScreenStyle.container}>
        <Animated.View>
          <View style={{ alignItems: "center" }}>

            <Image source={{ uri: item.image }} style={ItemScreenStyle.image}></Image>

            <Text style={ItemScreenStyle.name}>{item.name}</Text>
            <Text style={ItemScreenStyle.prices}>{item.price} DKK</Text>
          </View>

          <View style={{ paddingLeft: 10 }}>
            <Text style={ItemScreenStyle.description}>
              <Text style={{ fontSize: 24, fontWeight: "bold", color: "#ff4b3a" }}>
                {"Description \n"}
              </Text>
              <View style={ItemScreenStyle.readmoreContainer}>
              <ReadMore numberOfLines={3} style={ItemScreenStyle.descriptionText} seeMoreStyle={ItemScreenStyle.readmoreAndLessbtnStyle} seeLessStyle={ItemScreenStyle.readmoreAndLessbtnStyle}>
                {item.description}
              </ReadMore>
              </View>
            </Text>
            <View>
              <Allergene allergenes={item.allergenes} reset={reset} />
            </View>
            
          </View>
        </Animated.View>
        </ScrollView>
  )
}

// add shadow to image using shadowopacity and stuff
export default ItemScreen;
