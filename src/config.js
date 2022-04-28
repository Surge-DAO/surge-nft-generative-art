// add base URI 
const baseUri = 'ipfs://QmVinWsPn6itUMx6GstbWYqBkCVhJGeG5Xh8wRdUf5WJcK';
const description = 'Each Surge woman is of two worlds: pixel and pen. Each feature, though hand-sketched, has been layered algorithmically to form a whole. The Surge Passport collection represents our belief that beautiful things have a human touch.';

const layerConfigurations = {
      items: 4999,
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
        { name: 'RareSurge' },
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