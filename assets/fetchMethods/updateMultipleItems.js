import Url from "../Url";
const baseUrl = Url.url.url;
 
 
 async function UpdateVisibleMultipleItems(items) {
     if(items.length < 1 || items == undefined){
        return undefined;
     }
    const rawResponse = await fetch(baseUrl + "/updateVisibleItems", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      })
        .then(function (res) {
          return res.text();
        })
        .catch((err) => {
          console.log(err);
        });
      return rawResponse;
}

export default UpdateVisibleMultipleItems;
