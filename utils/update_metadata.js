const basePath = process.cwd();
const fs = require("fs");

const {
    baseUri
} = require(`${basePath}/src/config.js`);


fs.readdir('./build/json', (err, files) => {
    files.forEach(file => {
        let rawdata = fs.readFileSync(`${basePath}/build/json/`+file);
        let data = JSON.parse(rawdata);
        data.image = baseUri + "/" + file;
        fs.writeFileSync(`${basePath}/build/json/`+file, JSON.stringify(data, null, 2));
})});

console.log("Successfully update metadata uri to: " + baseUri);