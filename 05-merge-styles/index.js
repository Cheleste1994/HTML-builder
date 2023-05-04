const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');


async function createBundle() {
  const dirStart =  path.join(__dirname, './styles');
  const files = await fsPromises.readdir(dirStart);
  const dirEnd =  path.join(__dirname, './project-dist/bundle.css');
  const output = fs.createWriteStream(dirEnd);

  files.forEach(file => {
    if (path.extname(file) === '.css') {
      const fileCss = path.join(dirStart, file);
      const input = fs.createReadStream(fileCss, 'utf-8');

      input.on('data', chunk => output.write(`\n${chunk}`));
    }

  });
}


createBundle();
