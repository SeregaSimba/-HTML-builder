const EventEmitter = require('events');
let resultEvent = new EventEmitter();
const path = require('path');
const fs = require('fs');
resultEvent = path.join(__dirname, 'text.txt');
const result = fs.createReadStream(resultEvent);

result.on('data', (ivent) => console.log(ivent.toString()));
