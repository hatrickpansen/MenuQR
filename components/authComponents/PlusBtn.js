import React, {useState, useEffect} from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import imageManager from '../imageManager';
import {styleOrangeColor} from "../../styles/customStyles"
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from "@react-navigation/core";

const PlusBtn = ({isEditMode, restId}) => {
    const [isVisible, setIsVisible] = useState(isEditMode);
    const navigation = useNavigation();
    useEffect(()=> {
        setIsVisible(isEditMode);
    })

    if(!isVisible){
        return <View></View>
    } else if (isVisible){
        return (
            <View>
        
        <ModalDropdown dropdownTextStyle={styles.dropDownText} dropdownStyle={styles.dropDown} options={["Add Dish"]}
            dropdownTextHighlightStyle={styles.dropDownTextHigh} onSelect={ (index, value)=>{
                if(value == "Add Dish"){
                    navigation.navigate("ItemEdit", {isNew: true, restId: restId});
                }
            }}
            /* renderRowComponent={renderDropDownComponents} */
        >
       {/*  <TouchableOpacity > */}
        <Image style={styles.image} source={imageManager.plusicon} /* tintColor={"black"} *//> 
        {/* </TouchableOpacity> */}
        </ModalDropdown>
        
        
        
    </View>) }
    
}

const styles = StyleSheet.create({
    image: {
        height: 40,
        width: 40,
    },
    dropDown: {
        height: "11.5%",
        marginVertical: -50,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: styleOrangeColor.textOrange.color,
    },
    dropDownText: {
        borderRadius: 20,
        marginBottom: 5,
        alignItems: "center",
        fontSize: 20,         
    },
    dropDownTextHigh: {
       
    },
})

export default PlusBtn;