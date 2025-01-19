const fs = require('fs');
const path = require('path');

const createCopy = path.join(__dirname, 'project-dist', 'bundle.css');
const readIt = path.join(__dirname, 'styles');
const createNewFolder = fs.createWriteStream(createCopy);

fs.readdir(readIt, { withFileTypes: true }, (err, file) => {
  file.forEach((files) => {
    if (files.isFile() && files.name.slice(-3) === 'css') {
      const resultPath = path.join(readIt, files.name);
      const createNewThread = fs.createReadStream(resultPath);
      createNewThread.on('data', (chunk) => createNewFolder.write(chunk));
    }
  });
});
