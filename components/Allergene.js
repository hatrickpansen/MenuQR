import React from "react";
import { View, Text, StyleSheet, Image, TouchableHighlight} from "react-native";
import data from "../assets/data.json";
import imageManager from "./imageManager";

const Allergene = (props) => {
    const {id} = props;
    const items = data.filter(element => element.id==id);
    const allergenes =items[0].allergenes;
    const allergenesImages = imageManager.allergenes;
    var imgs = [];
    Object.keys(allergenes).forEach(function(key) {
        Object.keys(allergenesImages).forEach( keyStr => {
            if(key == keyStr){
                imgs.push(<TouchableHighlight style={styles.imgContainer}>
                            <Image source={allergenesImages[key]} style={styles.pic} />
                        </TouchableHighlight>);
            }
        })

    })
    
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