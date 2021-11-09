import React, {useState, useEffect} from "react";
import {
  ScrollView,
  Animated,
  View,
  Image,
  Text,
  StyleSheet, TextInput, CheckBox, Button, Dimensions
} from "react-native";

const screenHeight = Dimensions.get("window").height;
import ReadMore from "@fawazahmed/react-native-read-more";
import Allergene from "../itemScreenComponents/Allergene";
import { styleOrangeColor } from "../../styles/customStyles";
import AllergeneCard from "../itemScreenComponents/AllergeneCard";
import imageManager from "../imageManager"

const orangeColor = styleOrangeColor.textOrange.color;

const ItemEditCard = ({ item }) => {
    const allergenesImages = imageManager.allergenes;
    const allAls = createImageAlRelation(allergenesImages);
    const [allergenes, setAllergenes] = useState(item.allergenes)
    console.log(allergenes)
    const [itemName, setItemName] = useState(item.name)
    const [itemPrice, setItemPrice] = useState(item.price)
    const [itemDesc, setItemDesc] = useState(item.description)
    var data = []

    function isSelected(alName){
        if(allergenes.hasOwnProperty(alName)){
            return allergenes[alName];
        }
    }
    function setSelection(alName, val){
        let data = {};
        for(var key in allergenes){
            if(key == alName){
                data[key]  = val;
            } else {
                data[key] = allergenes[key];
            }
        }
        setAllergenes(data);
    }
    function storeChanges(){
        
    }

    for (let i = 0; i < allAls.length; i++) {
        data.push(
        <View key={allAls[i].id.toString()} style={{marginRight: 20}}>
            <View style={styles.alCardContainer}>
                <Animated.Image source={allAls[i].image} style={[styles.pic]} />
                <Text style={styles.noWrap, styleOrangeColor.textOrange}>{allAls[i].name}</Text>
              </View>
              <CheckBox
              value={isSelected(allAls[i].name)}
              onValueChange={(val) =>{
                  setSelection(allAls[i].name, val)
                  return val;
                }}
              />
          </View>);
        
    }
  return (
      <View>
    <ScrollView style={styles.container}>
      <View style={styles.secContainer}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image}></Image>
            <View style={styles.row}>
                <Text>Item Name</Text>
                <View style={styles.inputView}>
                    <TextInput 
                    style={styles.textInput} 
                    value={itemName}
                    onChangeText={(val) => setItemName(val)}
                    />
                    
                    </View>
            </View>
            <View style={styles.row}>
                <Text>Item Price</Text>
                <View style={styles.inputView}>
                    <TextInput 
                    style={styles.textInput} 
                    value={itemPrice.toString()}
                    keyboardType="numeric"
                    onChangeText={(val) => setItemPrice(val)}
                    />
                    <Text style={{opacity: 0.7, paddingRight: 5}}>DKK</Text>
                    </View>
            </View>
            <View style={styles.row}>
                <Text>Item Price</Text>
                <View style={[styles.inputView, styles.inputViewDesc]}>
                    <TextInput 
                    style={[styles.textInput, styles.textInputDesc]} 
                    value={itemDesc}
                    keyboardType="default"
                    multiline
                    onChangeText={(val) => setItemDesc(val)}
                    />
                    
                    </View>
            </View>
            <Text>{"Allergenes \n\n"}</Text>
            <View style={styles.alContainer}>        
                {data}
            </View>
          
        </View>
      </View>
     
    </ScrollView>
    <Button
    title="save changes"
    onPress={storeChanges}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 20,
    height: screenHeight,
  },
  secContainer: {
    marginVertical: 20
  },
 
  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    marginLeft: 15,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    }, 
     shadowOpacity: 0.4,
    shadowRadius: 2.0,
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
    flex: 1,
  },
  readmoreAndLessbtnStyle: {
    color: orangeColor,
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.9,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  inputView: {
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
    width: "70%",
    height: 45,
    marginBottom: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    alignItems: "center"
  },
  inputViewDesc: {
    height: 80,
  },
  textInputDesc: {
    height: 70,
    padding: 5
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  pic: {
    width: 30,
    height: 30,
    opacity: 0.6,
    margin: 5,
  },
  alCardContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
  }, 
  alContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start"
      
  },
  noWrap: {
      flexWrap: "nowrap"
  },
  center: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12.5
  }
});

export default ItemEditCard;

function createImageAlRelation(allergenesImages) {
    var data = [];
    let i = 0;
        Object.keys(allergenesImages).forEach((keyStr) => {
            data.push({ id: i, name: keyStr, image: allergenesImages[keyStr] });
            i++;
        });
    return data;
  }