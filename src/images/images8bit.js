const fs = require("fs");
var CanvasPlus = require('pixl-canvas-plus');
var canvasPlus = new CanvasPlus();
const { buildDir } = require("../setup/builddir.js");

const saveImage8bits = (_noOfItem) => {
    canvasPlus.load( `${buildDir}/images-24bits/${_noOfItem}.png`, function(err) {
      if (err) throw err;
  
      canvasPlus.resize({
        "width": 640,
        "height": 480,
        "mode": "fit"
      });
        
      canvasPlus.quantize({ colors: 256, dither: true, ditherType: "FloydSteinberg" });
      
      canvasPlus.write({"format":"png", "quality":90, "compression":1}, function(err, buf) {
        if (err) throw err;
        
        // 'buf' will be a binary buffer containing final image...
        fs.writeFileSync(`${buildDir}/images-8bits/${_noOfItem}.png`, buf);
      });
    });
  };

  module.exports = { saveImage8bits }