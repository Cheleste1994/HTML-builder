const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    await fs.access(targetDir);
    remDir(targetDir);
  } catch (error) {
    await fs.mkdir(targetDir);
  }

  const files = await fs.readdir(sourceDir);

  for (const file of files) {
    const sourceFile = path.join(sourceDir, file);
    const targetFile = path.join(targetDir, file);
    const stat = await fs.lstat(sourceFile);

    if (stat.isDirectory()) {
      await copyDir(sourceFile, targetFile);
    } else {
      await fs.copyFile(sourceFile, targetFile);
    }
  }
}

copyDir()

async function remDir(targetDir) {
  const files = await fs.readdir(targetDir);
 files.forEach((file) => {
  const targetFile = path.join(targetDir, file);
  fs.unlink(targetFile, () => { })
  })
}
