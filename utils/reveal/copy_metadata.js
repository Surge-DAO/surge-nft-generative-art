const basePath = process.cwd();
const fs = require("fs");
const sha1 = require("sha1");

const item = [
    'jewelry---ethereum.png',
    'hair---lush.png',
    'cheeks---blushed.png',
    'eyes---closed.png',
    'hand---shhh.png'
];

const baseUri = 'ipfs://QmajmdGpHs8Vmzema5ecKJBaFgHnmpaJes6cVAm5GR5mvD';

let rawdata = fs.readFileSync(`${basePath}/0`);
let data = JSON.parse(rawdata);
data.item = sha1(item.join(""));

for (let i = 0; i < 5000; i++) {
    data.name = i;
    data.image = baseUri + "/" + data.name + ".png";
    fs.writeFileSync(`${basePath}/reveal/`+i, JSON.stringify(data, null, 2));
  }

console.log("Successfully created files");