// add base URI 
const baseUri = 'ipfs://'

const layerConfigurations = {
      items: 1,
      layersOrder: [
        { name: 'Background' },
        // { name: 'Body' },
        // { name: 'Crown' },
        // { name: 'Earrings' },
        // { name: 'Hair' },
        // { name: 'Head' },
        // { name: 'Necklace' },
        // { name: 'Wood' },
      ],
};

const rarityDelimiter = '#';

const uniqueDnaTolerance = 10;

module.exports = { layerConfigurations, rarityDelimiter, uniqueDnaTolerance}