const fs = require('fs/promises');
const path = require('path');

const copyFolder = path.join(__dirname, 'files');
const resultFolder = path.join(__dirname, 'files-copy');

async function result() {
  try {
    await fs.rm(resultFolder, { recursive: true, force: true });
    await fs.mkdir(resultFolder, { recursive: true });
    const fileResult = await fs.readdir(copyFolder);

    for (const copyFiles of fileResult) {
      const itterFile = path.join(copyFolder, copyFiles);
      const itterCopyFile = path.join(resultFolder, copyFiles);
      await fs.copyFile(itterFile, itterCopyFile);
    }
  } catch (error) {
    console.error('error', error);
  }
}
result();
