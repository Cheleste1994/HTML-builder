const fs = require('fs');
const path = require('path');
const process = require('process');

const fileName = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(fileName);

readStream.pipe(process.stdout);
