// add base URI 
const baseUri = 'ipfs://';
const description = 'Surge NFTs project';

const layerConfigurations = {
      items: 5,
      layersOrder: [
        { name: 'Background' },
        { name: 'BackHair' },
        { name: 'Base' },
        { name: 'Mouth' },
        { name: 'Nose' },
        { name: 'Blush' },
        { name: 'Clothing' },
        { name: 'Earrings' },
        { name: 'JewelryFace' },
        { name: 'JewelryFace' },
        { name: 'FrontHair' },
        { name: 'Eyes' },
        { name: 'JewelryForehead' },
        { name: 'JewelryNeck' },
        { name: 'JewelryNeck' },
        { name: 'Eyebrows' },
      ],
};

const format = {
    width: 3000,
    height: 3000,
}

const rarityDelimiter = '#';
const nameSeparator = '-';

const uniqueMetadataTolerance = 1000;

module.exports = { layerConfigurations, rarityDelimiter, nameSeparator, uniqueMetadataTolerance, format, description, baseUri}