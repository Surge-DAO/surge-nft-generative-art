const fs = require("fs");
const path = require("path");

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
    uniqueDnaTollerance
} = require(path.join(basePath, "/src/config.js"));

// list of generated DNAs
var dnaList = [];

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

            
            dnaList.push(dna);
            noOfItem++;
        } else {
            console.log("DNA exists!");
            failedCount++;
            if (failedCount >= uniqueDnaTollerance) {
                console.log(`Error: you need more layers to create ${layerConfigurations.items}  unique items`);
                process.exit();
            }
        }
    }



};


module.exports = {buildSetup, startCreating};