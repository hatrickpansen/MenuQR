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
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';
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
        console.log(allAls)
        for(let i = 0; i < allAls.length; i++){
            if(!allergenes.hasOwnProperty(allAls[i]["name"])){
                if(allAls[i]["name"] == alName){
                    data[allAls[i]["name"]]  = val;
                } else {
                    data[allAls[i]["name"]] = false;
                }
            } else {
                if(allAls[i]["name"] == alName){
                    data[allAls[i]["name"]]  = val;
                } else {
                    data[allAls[i]["name"]] = allergenes[allAls[i]["name"]];
                }
            }
        }
        
        
        setAllergenes(data);
    }
    async function storeChanges(){
      const rawResponse = await fetch(baseUrl + '/editItem', {
        method: 'POST',
        headers: {
        Accept: 'application/json',
                'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: item.id,
          name: itemName,
          price: itemPrice,
          description: itemDesc,
          allergenes: allergenes,
          restId: item.restId,
          type: item.type,
          image: item.image,
          title: item.title
        })
      })
      .then(function(res){ 
        return res.text(); 
      })
      .catch((err) => {
      console.log(err);
    })
    console.log(rawResponse);
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
    <View style={styles.outerContainer}>
        <ScrollView style={styles.scrollContainer}>
            <View styles={styles.container}>
                <Image source={{ uri: item.image }} style={styles.image}/>
                <View style={{flex:1, flexDirection: "row", paddingTop: 20}}>
                    <View style={{flex: 1, justifyContent: "center"}}>
                              <View style={{flex: 1}}>
                                <Text style={styles.name}>Item Name</Text>
                              </View>
                              <View style={{flex: 1}}>
                                <Text style={styles.name}>Item Price</Text>
                              </View>
                              <View style={{flex: 3}}>
                                <Text style={styles.name}>Item Description</Text>
                              </View>
                    </View>
                    <View style={{flex: 2}}>
                          <View style={{flex:1}}>
                                  <View style={styles.inputView}>
                                      <TextInput 
                                          style={styles.textInput} 
                                          value={itemName}
                                          onChangeText={(val) => setItemName(val)}
                                      />                    
                                  </View>
                        </View>
                      <View style={{flex: 1}}>
                            <View style={[styles.inputView]}>
                                  <TextInput 
                                    style={styles.textInput} 
                                    value={itemPrice.toString()}
                                    keyboardType="numeric"
                                    onChangeText={(val) => setItemPrice(val)}
                                  />
                                  <Text style={{opacity: 0.7, paddingRight: 5}}>DKK</Text>
                            </View>
                      </View>
                      <View style={{flex: 1}}>
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
                    </View>
                </View>
                <Text style={styles.name}>{"Allergenes\n"}</Text>
                <View style={styles.alContainer}>        
                  {data}
                </View>
            </View>
        </ScrollView>
        <View style={{justifyContent: "flex-end" }}>
            <Button
                title="save changes"
                onPress={async () => {
                  storeChanges()
                } }
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    outerContainer: {
        justifyContent: "space-between",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    scrollContainer: {
        //flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    paddingVertical: 0,
    height: screenHeight*0.975,
  },
  container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      
  },
  inputView: {
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
    width: "85%",
    height: 45,
    marginBottom: 20,
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    alignItems: "center"
  },
  secContainer: {
    marginVertical: 20,
    flex: 1
  },
 
  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    }, 
     shadowOpacity: 0.4,
    shadowRadius: 2.0,
  },
  name: {
    fontSize: 14,
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
    justifyContent: "flex-start"
  },
  
  inputViewDesc: {
    height: 135,
  },
  textInputDesc: {
    height: 125,
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