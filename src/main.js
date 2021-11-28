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
    uniqueDnaTolerance,
    format,
    description,
    baseUri
} = require(path.join(basePath, "/src/config.js"));

// get a drawing context on the canvas
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d");

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
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images`);
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
      `${buildDir}/images/${_noOfItem}.png`,
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

const startCreating = async () => {
    let noOfItem = 1;
    let failedCount = 0;

    // get layers based on configuration
    const layers = layersSetup(
            layerConfigurations.layersOrder
    );

    // create images and metadata
    while ( noOfItem <= layerConfigurations.items) {
        let dna = createDna(layers);
        if (isDnaUnique(dnaList, dna)) {

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
            console.log("DNA exists!");
            failedCount++;
            if (failedCount >= uniqueDnaTolerance) {
                console.log(`Error: you need more layers to create ${layerConfigurations.items}  unique items`);
                process.exit();
            }
        }
    }
};


module.exports = {buildSetup, startCreating};