import Url from "../Url";
const baseUrl = Url.url.url;

const fetchAvailableItems = async (restaurantID, abortSignal) => {
    const resp = await fetch(baseUrl + "/availableItems/" + restaurantID, {
        abortSignal,
      })
    .catch((error) => {
      console.error(error);
    });
    const statusCode = resp.status;
    if (statusCode == 200) {
      return await resp.json();
    }
  };


export default fetchAvailableItems;