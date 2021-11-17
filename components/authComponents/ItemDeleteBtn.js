import React from 'react';
import { TouchableOpacity, view, text, StyleSheet } from 'react-native';
import { Entypo } from "@expo/vector-icons";


const ItemDeleteBtn = ({callBack}) => {

    return (
        <TouchableOpacity style={styles.container} onPress={()=>{callBack(true)}}>
            <Entypo name="trash" size={24} color="white" />
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "red",
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
        width: "20%"

    }
})

export default ItemDeleteBtn;