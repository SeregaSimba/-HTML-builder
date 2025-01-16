const path = require('path');
const fs = require('fs');
const process = require('process');

const wireString = fs.createWriteStream(path.join(__dirname, './text.txt'));

console.log('Hello, enter the desired text.');

wireString.on('./02-write-file', (date) => {
  console.log(date.process);
});

process.stdin.on('data', (date) => {
  const input = date.toString().trim();
  if (input === 'exit') {
    console.log('The recording is complete, goodbye!');
    process.exit();
  } else {
    wireString.write(input + '\n');
    console.log('the text is written in the file, enter additional text');
  }
});

process.on('SIGINT', () => {
  console.log('The recording is complete, goodbye!');
  process.exit();
});
