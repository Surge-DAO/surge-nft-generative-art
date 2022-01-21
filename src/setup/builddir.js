const fs = require("fs");
const path = require("path");
// get path of the current directory
const isLocal = typeof process.pkg === "undefined";
const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);

// build directory (where images and json files are saved)
const buildDir = `${basePath}/build`;
// layers directory (where image layers are saved)
const layersDir = `${basePath}/layers`;

// create build directory to store generated images and json files
const buildSetup = () => {
    if (fs.existsSync(buildDir)) {
      fs.rmSync(buildDir, { recursive: true });
    }
    fs.mkdirSync(buildDir);
    // TODO: create two dirs for 24bits and 8 bits
    fs.mkdirSync(`${buildDir}/json`);
    fs.mkdirSync(`${buildDir}/images-24bits`);
    fs.mkdirSync(`${buildDir}/images-8bits`);
};

module.exports = { buildDir,  layersDir, buildSetup }