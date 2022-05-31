const fs = require('fs');
const path = require('path');
let text = '';

const readableStream = fs.createReadStream(
  path.resolve('stream', 'input.txt'),
  {
    highWaterMark: 15
  }
);

const writeableStream = fs.createWriteStream(
  path.resolve('stream', 'output.txt'),
  { highWaterMark: 15 }
);

readableStream.on('readable', () => {
  try {
    writeableStream.write(`${readableStream.read()}\n`);
  } catch (error) {
    console.log('error => ', error);
  }
});

readableStream.on('end', () => {
  writeableStream.end();
});
