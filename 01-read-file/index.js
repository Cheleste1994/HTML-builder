const fs = require('fs');
const path = require('path');
const process = require('process');

const fileName = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(fileName, 'utf-8');

stream.pipe(process.stdout);
