// add base URI 
const baseUri = 'ipfs://'

const layerConfigurations = {
      items: 2,
      layersOrder: [
        { name: 'Background' },
        { name: 'Body' },
        { name: 'Crown' },
        { name: 'Earrings' },
        { name: 'Hair' },
        { name: 'Head' },
        { name: 'Necklace' },
        { name: 'Wood' },
      ],
};

const rarityDelimiter = '#';

const uniqueDnaTollerance = 10;

module.exports = { layerConfigurations, rarityDelimiter, uniqueDnaTollerance}