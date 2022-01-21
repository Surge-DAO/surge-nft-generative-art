const {run} = require("./src/main.js");
const {buildSetup} = require("./src/setup/builddir.js");

(() => {
    buildSetup();
    run();
})();