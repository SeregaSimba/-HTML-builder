const path = require('path');
const fs = require('fs');
const process = require('process');
const secretFolder = path.join(__dirname, './secret-folder');

fs.readdir(secretFolder, { withFileTypes: true }, (error, file) => {
  file.forEach((files) => {
    if (files.isFile()) {
      const filePath = path.join(secretFolder, files.name);
      const perse = path.parse(filePath);
      fs.stat(filePath, (error, stats) => {
        const ext = perse.ext.slice(1);
        const name = perse.name;
        const size = (stats.size / 1024).toFixed(3);
        process.stdout.write(`${name} - ${ext} - ${size} `);
      });
    }
  });
});
