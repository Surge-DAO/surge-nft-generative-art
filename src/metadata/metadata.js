const fs = require("fs");
const sha1 = require("sha1");
const { description, baseUri } = require("../config.js");
const { buildDir } = require("../setup/builddir.js");

// list of generated Metadata
var metadataList = [];

const generateMetadata = (_item, _noOfItem, _attributesList) => {
    let dateTime = Date.now();
    let tempMetadata = {
      item: sha1(_item.join("")),
      name: _noOfItem,
      description: description,
      image: `${baseUri}/${_noOfItem}.png`,
      date: dateTime,
      attributes: _attributesList,
      compiler: "Surge NFTs",
    };
    metadataList.push(tempMetadata);
 //   attributesList = [];
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

module.exports = { generateMetadata, saveMetadata }