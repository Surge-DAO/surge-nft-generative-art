const { createCanvas } = require("canvas");

const {
    layerConfigurations,
    uniqueMetadataTolerance,
    format
} = require("./config.js");

const { rules } = require("./rules/rules.js");
const { isDarkSkinLightHairBelow } = require("./combos/combos.js");
const { saveImage8bits } = require("./images/images8bit.js");
const { loadLayerImage, drawElement, saveImage24bits } = require("./images/images24bit.js");
const { generateMetadata, saveMetadata } = require("./metadata/metadata.js");
const { layersSetup, createItem, isItemUnique, itemToLayers } = require("./layers/layers.js");

// get a drawing context on the canvas
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d", {alpha: false});

// list of generated Items
var itemList = [];

var attributesList = [];

const run = async () => {
    let noOfItem = 0;
    let failedCount = 0;
    let maxItems = noOfItem + layerConfigurations.items

    // get layers based on configuration
    const layers = layersSetup(
            layerConfigurations.layersOrder
    );

    // create images and metadata
    while ( noOfItem <= maxItems) {
        let item = createItem(layers);
        if (isItemUnique(itemList, item) && rules(item) && isDarkSkinLightHairBelow(itemList, item)) {
        
            let results = itemToLayers(item, layers);
            let loadedElements = [];

            results.forEach((layer) => {
                loadedElements.push(loadLayerImage(layer));
            });

            //start drawing image
            await Promise.all(loadedElements).then((renderObjectArray) => {
                ctx.clearRect(0, 0, format.width, format.height);

                renderObjectArray.forEach((renderObject) => {
                    drawElement(renderObject, attributesList);
                });

                saveImage24bits(noOfItem);
                saveImage8bits(noOfItem);
                generateMetadata(item, noOfItem, attributesList);
                attributesList = [];
                saveMetadata(noOfItem);
            });
            
            itemList.push(item);
            noOfItem++;
        } else {
            console.log("Applying rules: eliminating wrong metadata");
            failedCount++;
            if (failedCount >= uniqueMetadataTolerance) {
                console.log(`Error: you need more layers to create ${layerConfigurations.items}  unique items`);
                process.exit();
            }
        }
    }
    console.log("Successfully generated NFTs.");
};

module.exports = {run};