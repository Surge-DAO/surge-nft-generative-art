// add base URI 
const baseUri = 'ipfs://';
const description = 'Surge NFTs project';

const layerConfigurations = {
      items: 2,
      layersOrder: [
        { name: 'Background' },
        { name: 'Body' },
        { name: 'Earrings' },
        { name: 'Hair' },
        { name: 'Head' },
        { name: 'Necklace' },
        { name: 'Wood' },
        { name: 'Crown' },
      ],
};

const format = {
    width: 3000,
    height: 3000,
  }

const rarityDelimiter = '#';

const uniqueDnaTolerance = 10;

module.exports = { layerConfigurations, rarityDelimiter, uniqueDnaTolerance, format, description, baseUri}