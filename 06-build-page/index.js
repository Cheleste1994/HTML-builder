const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');


async function createProject() {
  const targetDir = path.join(__dirname, 'project-dist');

  fs.mkdir(targetDir, () => {
    adddHTML();
    copyDir();
    addCss();
  });


}

createProject();

async function adddHTML() {
  const htmlStart =  path.join(__dirname, './template.html');
  const htmlDir = path.join(__dirname, 'components');
  const fileEnd =  path.join(__dirname, './project-dist/index.html');

  try {
    const fileStart = await fsPromises.readFile(htmlStart, 'utf-8');
    const tagRegex = /\{\{(\w+)\}\}/g;
    const tags = fileStart.match(tagRegex) || [];

    const components = await Promise.all(
      tags.map(async (tag) => {
        const componentName = tag.replace('{{', '').replace('}}', '');
        const componentPath = path.join(htmlDir, `${componentName}.html`);

        try {
          const componentContent = await fsPromises.readFile(componentPath, 'utf-8', () => { });
          return { tag, content: componentContent };
        } catch (error) {
          return { tag, content: '' };
        }
      })
    );

    let indexHtml = fileStart;
    components.forEach(({ tag, content }) => {
      indexHtml = indexHtml.replace(tag, content);
    });

    await fsPromises.writeFile(fileEnd, indexHtml, 'utf-8');
  } catch (error) {

    console.log(`Error: ${error.message}`);
  }
}


async function copyDir(dir = 0, isDir = 0) {
  const sourceDir = path.join(__dirname, 'assets');
  const targetDir = path.join(__dirname, './project-dist/assets');

  fs.mkdir(isDir || targetDir, () => {  });

  const files = await fsPromises.readdir(dir || sourceDir);
  files.forEach(x => {
    const file = path.join(dir || sourceDir, x);
    fs.stat(file, (err, stats) => {

      if (stats.isFile()) {
        fs.copyFile(file, `${isDir || targetDir}\\${x}`, () => { });
      } else {
        const newDir = path.join(isDir || targetDir, x);
        copyDir(file, newDir);
      }
    });

  });
}


async function addCss() {
  const dirStart =  path.join(__dirname, './styles');
  const files = await fsPromises.readdir(dirStart);
  const dirEnd =  path.join(__dirname, './project-dist/style.css');
  const output = fs.createWriteStream(dirEnd);

  files.forEach(file => {
    if (path.extname(file) === '.css') {
      const fileCss = path.join(dirStart, file);
      const input = fs.createReadStream(fileCss, 'utf-8');

      input.on('data', chunk => output.write(`\n${chunk}`));
    }
  });
}
