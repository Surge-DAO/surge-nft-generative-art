const fs = require("fs");
const { layersDir } = require("../setup/builddir.js");
const { rarityDelimiter } = require("../config.js");

// extract layers into an object
const layersSetup = (layersOrder) => {
    const layers = layersOrder.map((layerObj, index) => ({
      id: index,
      name: layerObj.name,
      elements: getElements(`${layersDir}/${layerObj.name}/`),
      blendMode:
        layerObj["blend"] != undefined ? layerObj["blend"] : "source-over",
      opacity: layerObj["opacity"] != undefined ? layerObj["opacity"] : 1,
    }));
    return layers;
};

// get element of each layer (id, name, path and weight)
const getElements = (path) => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i, index) => {
        return {
          id: index,
          name: getName(i),
          filename: i,
          path: `${path}${i}`,
          weight: getRarityWeight(i),
        };
      });  
};

// get weight
const getRarityWeight = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = Number(
      nameWithoutExtension.split(rarityDelimiter).pop()
    );
    if (isNaN(nameWithoutWeight)) {
      nameWithoutWeight = 0;
    }
    return nameWithoutWeight;
  };

// get name (without extension and weight)  
const getName = (_str) => {
    let nameWithoutExtension = _str.slice(0, -4);
    var nameWithoutWeight = nameWithoutExtension.split(rarityDelimiter).shift();
    return nameWithoutWeight.slice(0, -1);
};

const getItemId = (_str) => {
    var item = Number(_str.split(":").shift());
    return item;
  };

// create random item based on the weights of each layer
const createItem = (_layers) => {
    let randItem = [];
    _layers.forEach((layer) => {
      var totalWeight = 0;
      layer.elements.forEach((element) => {
        totalWeight += element.weight;
      });
      // number between 0 - totalWeight
      let random = Math.floor(Math.random() * totalWeight);
      for (var i = 0; i < layer.elements.length; i++) {
        // subtract the current weight from the random weight until we reach a sub zero value.
        random -= layer.elements[i].weight;
        if (random < 0) {
          return randItem.push(
            `${layer.elements[i].id}:${layer.elements[i].filename}`
          );
        }
      }
    });
    return randItem;
};

// check if generated Item already exists
const isItemUnique = (_ItemList = [], _item = []) => {
    let foundItem = _ItemList.find((i) => i.join("") === _item.join(""));
    return foundItem == undefined ? true : false;
};

// map items to layer data
const itemToLayers = (_item = [], _layers = []) => {
    let mappedItemToLayers = _layers.map((layer, index) => {
      let selectedElement = layer.elements.find(
        (e) => e.id == getItemId(_item[index])
      );
      return {
        name: layer.name,
        blendMode: layer.blendMode,
        opacity: layer.opacity,
        selectedElement: selectedElement,
      };
    });
    return mappedItemToLayers;
};

module.exports = { layersSetup, createItem, isItemUnique, itemToLayers }
