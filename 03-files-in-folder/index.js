const path = require('path');
const fsPromises = require('fs/promises');
const folderPath = path.join(__dirname, 'secret-folder');

async function processFolder(folderPath) {
  const files = await fsPromises.readdir(folderPath);
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    try {
      const stats = await fsPromises.stat(filePath);

      if (stats.isDirectory()) {
        await processFolder(filePath);
      } else if (stats.isFile()) {
        const fileSizeInKilobytes = stats.size / 1024;
        const fileExtension = path.extname(filePath).slice(1);
        const fileName = path.basename(filePath, `.${fileExtension}`);

        console.log(`${fileName} - ${fileExtension} - ${fileSizeInKilobytes.toFixed(3)}kb`);
      }
    } catch (err) {
      console.error(`Ошибка ${file}: ${err}`);
    }
  }
}

processFolder(folderPath);











