import React, {useState} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 



const VisibleBtn = ({callback}) => {
    const [isVisible, setIsVisible] = useState(true);
    const nameVisible = "visibility";
    const nameNotVisible = "visibility-off";

    function onPressBtn(){
        let data = {isVisible: !isVisible};
        callback(data);
        setIsVisible(!isVisible);
    }
    return (<TouchableOpacity onPress={onPressBtn}>
        <MaterialIcons style={{opacity: isVisible ? 1 : 0.5 }} name={isVisible ? nameVisible : nameNotVisible} size={30}/>
    </TouchableOpacity>)

}


export default VisibleBtn;
