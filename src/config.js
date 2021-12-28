// add base URI 
const baseUri = 'ipfs://';
const description = 'Surge NFTs project';

const layerConfigurations = {
      items: 10,
      layersOrder: [
        { name: 'Background' },
        { name: 'Hair' },
        { name: 'Body' },
        { name: 'Mouth' },
        { name: 'Nose' },
        { name: 'Blush' },
        { name: 'Clothing' },
        { name: 'Jewelry' },
        { name: 'FrontHair' },
        { name: 'Eyes' },
        { name: 'Eyebrows' },
      ],
};

const format = {
    width: 3000,
    height: 3000,
}

const rarityDelimiter = '#';

const uniqueDnaTolerance = 10;

module.exports = { layerConfigurations, rarityDelimiter, uniqueDnaTolerance, format, description, baseUri}