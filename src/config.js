// add base URI 
const baseUri = 'ipfs://Qmeca8tkLUKBrUCcbK4xvKfL6iXsCNd84s4XYRpQQ6B4ve';
const description = 'Surge NFTs project';

const layerConfigurations = {
      items: 1,
      layersOrder: [
        { name: 'Background' },
        { name: 'BackHair' },
        { name: 'Base' },
        { name: 'Tattoos' },
        { name: 'Mouth' },
        { name: 'Nose' },
        { name: 'Blush' },
        { name: 'Clothing' },
        { name: 'Earrings' },
        { name: 'JewelryFace' },
        { name: 'JewelryFace' },
        { name: 'Eyes' },
        { name: 'Eyebrows' },
        { name: 'JewelryNeck' },
        { name: 'JewelryNeck' },
        { name: 'FrontHair' },
        { name: 'JewelryForehead' },
      ],
};

const format = {
    width: 3000,
    height: 3000,
}

const rarityDelimiter = '#';
const nameSeparator = '-';

const uniqueMetadataTolerance = 100000;

module.exports = { layerConfigurations, rarityDelimiter, nameSeparator, uniqueMetadataTolerance, format, description, baseUri}