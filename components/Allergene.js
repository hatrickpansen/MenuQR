import React from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight} from "react-native";
import data from "../assets/data.json";
import allergeneData from "./allergeneData.json";

const Allergene = (props) => {
    const {id, imageSource, text, colorHex} = props;
    const items = data.filter(element => element.id==id);
    const allergenes =items[0].allergenes;
    var imgs = [];
    function images (allergenes) {
        Object.keys(allergenes).forEach(function(key) {
            if(key == "egg" && allergenes[key]){
                imgs.push(<TouchableHighlight style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/egg.jpg')} style={styles.pic} />
                        </TouchableHighlight>
                    );
            } else if(key == "peanuts" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/peanuts.jpg')} style={styles.pic} /> 
                        </View>
                    );
            }
            else if(key == "crustacean" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/crustacean.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "fish" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/fish.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "gluten" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/gluten.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "milk" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/milk.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "nuts" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/nuts.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "sesame" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/sesame.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "shellfish" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/shellfish.jpg')} style={styles.pic} />
                        </View>
                    );
            }
            else if(key == "sulfates" && allergenes[key]){
                imgs.push(<View style={styles.imgContainer}>
                            <Image source={require('../assets/allergenesphotos/sulfates.jpg')} style={styles.pic} />
                        </View>
                    );
            }
          })
          return imgs;
    }
   
    imgs = images(allergenes);
    return(
    <View>
        <Text >
            <Text style={styles.header}>
                Allergenes
            </Text>
        </Text>
        <View style={styles.al}>
            {imgs}
        </View>
    </View>
    );

}


const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff4b3a"
    },
    text: {
        fontSize: 20
    },
    pic: {
        width: 30,
        height: 30,
        
    },
    al: {
        flexDirection: "row",
        flexWrap: "wrap",
        
        
    },
    imgContainer: {
        alignItems: "center",
        flexDirection: "column",
        marginRight: 5,
        justifyContent: 'center',
        marginBottom: 5,
    }
})

export default Allergene