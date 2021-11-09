import React, {useState, useEffect} from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { View, TouchableOpacity } from 'react-native';

const EditIcon = ({size, editMode, callback, itemData}) => {
    const item = itemData;
    const [isEditMode, setIsEditMode] = useState(editMode);
    useEffect(()=>{
        setIsEditMode(editMode);
    })
    function isClicked(){
        callback(item);
    }

    if(isEditMode){
        return( 
            <TouchableOpacity onPress={isClicked}>
            <FontAwesome5 name="edit" size={size} color="black" />
        </TouchableOpacity>
        
        )
    } else {
        return <View></View>
    }
    
}
export default EditIcon;