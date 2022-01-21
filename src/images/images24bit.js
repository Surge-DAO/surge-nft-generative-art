const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const { format } = require("../config.js");
const { buildDir } = require("../setup/builddir.js");

// get a drawing context on the canvas
const canvas = createCanvas(format.width, format.height);
const ctx = canvas.getContext("2d", {alpha: false});

// load image from file
const loadLayerImage = async (_layer) => {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
};

// draw image
const drawElement = (_renderObject, _attributesList) => {
    ctx.globalAlpha = _renderObject.layer.opacity;
    ctx.globalCompositeOperation = _renderObject.layer.blendMode;
    ctx.drawImage(_renderObject.loadedImage, 0, 0, format.width, format.height);
    addAttributes(_renderObject, _attributesList);
};

// add attributes to the image
const addAttributes = (_element, _attributesList) => {
    let selectedElement = _element.layer.selectedElement;
    _attributesList.push({
      trait_type: _element.layer.name,
      value: selectedElement.name,
    });
};

// save image to build directoru
const saveImage24bits = (_noOfItem) => {
    fs.writeFileSync(
      `${buildDir}/images-24bits/${_noOfItem}.png`,
      canvas.toBuffer("image/png")
    );
};

module.exports = { loadLayerImage, drawElement, saveImage24bits }