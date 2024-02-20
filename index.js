const { directoryPath, reddir, newDirectory, readFile, writeFile } = require("./fsSystemModule.js");
const fs = require('node:fs/promises');
reddir();
newDirectory('hello');

writeFile();
readFile();
