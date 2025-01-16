const path = require('path');
const fs = require('fs');
const pathResult = path.join(__dirname, 'text.txt');
const result = fs.createReadStream(pathResult);

result.on('data', (ivent) => console.log(ivent.toString()));
