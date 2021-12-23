// add base URI 
const baseUri = 'ipfs://';
const description = 'Surge NFTs project';

const layerConfigurations = {
      items: 5,
      layersOrder: [
        { name: 'Background' },
        { name: 'Hair' },
        { name: 'Body' },
        { name: 'FrontHair' },
        { name: 'Eyes' },
        { name: 'Eyebrows' },
        { name: 'Nose' },
        { name: 'Mouth' },
        { name: 'Blush' },
        { name: 'Clothing' },
        { name: 'Jewelry' },
      ],
};

const format = {
    width: 3000,
    height: 3000,
  }

const rarityDelimiter = '#';

const uniqueDnaTolerance = 10;

module.exports = { layerConfigurations, rarityDelimiter, uniqueDnaTolerance, format, description, baseUri}