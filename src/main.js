const fs = require("fs");
const path = require("path");
const sha1 = require("sha1");
const { createCanvas, loadImage } = require("canvas");

// get path of the current directory
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// build directory (where images and json files are saved)
const buildDir = `${basePath}/build`;
// layers directory (where image layers are saved)
const layersDir = `${basePath}/layers`;

const {
    layerConfigurations,
    rarityDelimiter,
    uniqueMetadataTolerance,
    format,
    description,
    baseUri
} = require(path.join(basePath, "/src/config.js"));

// get a drawing context on the canvas
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d", {alpha: false});

// list of generated DNAs
var dnaList = [];

// list of generated Metadata
var metadataList = [];

var attributesList = [];

// create build directory to store generated images and json files
const buildSetup = () => {
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    // TODO: create two dirs for 24bits and 8 bits
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images-24bits`);
};

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
    return nameWithoutWeight;
};

const getDnaId = (_str) => {
    var dna = Number(_str.split(":").shift());
    return dna;
  };

// create random item based on the weights of each layer
const createDna = (_layers) => {
    let randDna = [];
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
          return randDna.push(
            `${layer.elements[i].id}:${layer.elements[i].filename}`
          );
        }
      }
    });
    return randDna;
};

// check if generated DNA already exists
const isDnaUnique = (_DnaList = [], _dna = []) => {
    let foundDna = _DnaList.find((i) => i.join("") === _dna.join(""));
    return foundDna == undefined ? true : false;
};

// check if back hair, front hair, eyebrows-b match
// long bangs in salmon, green, blue, and pink may be combined with any color back hair 
const hairColorsMatch = ( _dna = []) => {
  // check if long bangs salmon, green, blue or pink
  let frontHairColorCondition = _dna.some(e => e.includes("long-bangs") && (e.includes("salmon") || e.includes("green") || e.includes("blue") || e.includes("pink")));

  let colors = [];
  if(frontHairColorCondition) {
    //TODO: matches back hair or front hair?
    _dna.forEach(function(element){
      if (element.includes("back-hair") || element.includes("eyebrows-b")){
        const color = element.split('-');
        colors.push(color[color.length - 2]);
      }
    });
  } else {
    _dna.forEach(function(element){
      if (element.includes("back-hair") || element.includes("front-hair") || element.includes("eyebrows-b")){
        const color = element.split('-');
        colors.push(color[color.length - 2]);
      }
    });
  }
  return colors.every( (val, i, arr) => val === arr[0] );
};

// long bangs cannot be combined with "veil solid" or "veil gauzy" in forehead jewelry category
const areLongBangsWithVeilJewelry = ( _dna = []) => {
  return _dna.some(e => e.includes("long-bangs")) && _dna.some(e => e.includes("veil"));
};

//"front hair - long bangs" & variant colors of it cannot be combined with "back hair - natural black"
// TODO: - no natural black hair?
const areLongBangsWithNaturalBlackHair = ( _dna = []) => {
  return _dna.some(e => e.includes("long-bangs")) && _dna.some(e => e.includes("natural-black"));
};

//"jewelry face - snake bites" cannot be combined with "mouth - full smile red" or "mouth - full smile hazelnut"
const areJewelrySnakeBitesWithFullMouthRedHazelnut = ( _dna = []) => {
  return _dna.some(e => e.includes("snake-bites")) && (_dna.some(e => e.includes("full-smile-red")) || _dna.some(e => e.includes("full-smile-hazelnut")));
};

// if jewelry face exists, no jewelry forehead
const jewelryFaceExists = ( _dna = []) => {
  let exists = false;
  _dna.forEach(function(element){
    if (element.includes("jewelryface")){
      exists = true;
    }
  });
  if (exists) {
    _dna = _dna.filter(element => !(element.includes("jewelryforehead")));
  }
  return _dna;
};

// map dna items to layer data
const dnaToLayers = (_dna = [], _layers = []) => {
    let mappedDnaToLayers = _layers.map((layer, index) => {
      let selectedElement = layer.elements.find(
        (e) => e.id == getDnaId(_dna[index])
      );
      return {
        name: layer.name,
        blendMode: layer.blendMode,
        opacity: layer.opacity,
        selectedElement: selectedElement,
      };
    });
    return mappedDnaToLayers;
};

// load image from file
const loadLayerImage = async (_layer) => {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
};

// draw image
const drawElement = (_renderObject) => {
    ctx.globalAlpha = _renderObject.layer.opacity;
    ctx.globalCompositeOperation = _renderObject.layer.blendMode;
    ctx.drawImage(_renderObject.loadedImage, 0, 0, format.width, format.height);
    addAttributes(_renderObject);
};

// add attributes to the image
const addAttributes = (_element) => {
    let selectedElement = _element.layer.selectedElement;
    attributesList.push({
      trait_type: _element.layer.name,
      value: selectedElement.name,
    });
};

// save image to build directoru
const saveImage = (_noOfItem) => {
    fs.writeFileSync(
      `${buildDir}/images-24bits/${_noOfItem}.png`,
      canvas.toBuffer("image/png")
    );
};

const generateMetadata = (_dna, _noOfItem) => {
    let dateTime = Date.now();
    let tempMetadata = {
      dna: sha1(_dna.join("")),
      name: _noOfItem,
      description: description,
      image: `${baseUri}/${_noOfItem}.png`,
      date: dateTime,
      attributes: attributesList,
      compiler: "Surge NFTs",
    };
    metadataList.push(tempMetadata);
    attributesList = [];
};

const saveMetadata = (_noOfItem) => {
    fs.writeFileSync(
      `${buildDir}/json/${_noOfItem}.json`,
      JSON.stringify(
        metadataList.find((metadata) => metadata.name == _noOfItem),
        null,
        2
      )
    );
  };

const run = async () => {
    let noOfItem = 1;
    let failedCount = 0;

    // get layers based on configuration
    const layers = layersSetup(
            layerConfigurations.layersOrder
    );

    // create images and metadata
    while ( noOfItem <= layerConfigurations.items) {
        let dna = createDna(layers);
        if (isDnaUnique(dnaList, dna) && hairColorsMatch(dna) && !areLongBangsWithVeilJewelry(dna) && !areLongBangsWithNaturalBlackHair(dna) && !areJewelrySnakeBitesWithFullMouthRedHazelnut(dna)) {

            //check if jewelryface exsists
            dha = jewelryFaceExists(dna);

            let results = dnaToLayers(dna, layers);
            let loadedElements = [];

            results.forEach((layer) => {
                loadedElements.push(loadLayerImage(layer));
            });

            //start drawing image
            await Promise.all(loadedElements).then((renderObjectArray) => {
                ctx.clearRect(0, 0, format.width, format.height);

                renderObjectArray.forEach((renderObject) => {
                    drawElement(renderObject);
                });

                saveImage(noOfItem);
                generateMetadata(dna, noOfItem);
                saveMetadata(noOfItem);
            });
            
            dnaList.push(dna);
            noOfItem++;
        } else {
            console.log("Invalid metadata!");
            failedCount++;
            if (failedCount >= uniqueMetadataTolerance) {
                console.log(`Error: you need more layers to create ${layerConfigurations.items}  unique items`);
                process.exit();
            }
        }
    }
    console.log("Successfully generated NFTs.");
};

module.exports = {buildSetup, run};