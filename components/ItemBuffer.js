var itemsToBeChanged = []

export const addItem=(item)=>{
    updateItems(item, itemsToBeChanged);
}
export const getItems = () =>{
    return itemsToBeChanged;
}



function updateItems(newItem, array){
    for (let i = 0; i < array.length; i++) {
        if(array[i].id == newItem.id){
            array[i] = newItem;
          return array;
        }
    }
    array.push(newItem);
    return array;
}