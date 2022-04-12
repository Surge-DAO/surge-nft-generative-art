const percentage = 4;
let items = 0;

//  limit the proportion of NFTs with the two lightest hair colors and three darkest skin tones to 4% of collection? 
const isDarkSkinLightHairBelow = (_ItemList = [], _item = []) => {
    if(!(_item.some(e => e.includes("back-hair") && (e.includes("blonde") || e.includes("salmon"))) && _item.some(e => e.includes("base") && (e.includes("hazel") || e.includes("night") || e.includes("spice"))))) {
        return true;
    }

    let currentPercentage = (100 * items) / _ItemList.length;

    if(currentPercentage >= percentage) {
        console.log("reached limit");
        return false;
    }

    items++;
    return true;
};

module.exports = { isDarkSkinLightHairBelow }