// add base URI 
const baseUri = 'ipfs://QmVinWsPn6itUMx6GstbWYqBkCVhJGeG5Xh8wRdUf5WJcK';
const description = 'Surge NFTs project';

const layerConfigurations = {
      items: 2500,
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
        { name: 'Eyes' },
        { name: 'JewelryFace' },
        { name: 'JewelryFace' },
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

const uniqueMetadataTolerance = 10000000;

module.exports = { layerConfigurations, rarityDelimiter, nameSeparator, uniqueMetadataTolerance, format, description, baseUri}