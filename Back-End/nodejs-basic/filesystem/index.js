// TODO: tampilkan teks pada notes.txt pada console.
const fs = require('fs');
const path = require('path');

// fs.readFile(path.resolve('filesystem', 'notes.txt'), 'utf-8', (error, data) => {
//   if (error) return console.log('error', error);
//   console.log('data', data);
// });

const readableStream = fs.createReadStream(
  path.resolve('filesystem', 'article.txt'),
  {
    highWaterMark: 10
  }
);

readableStream.on('readable', () => {
  try {
    process.stdout.write(`[${readableStream.read()}]`);
  } catch (error) {
    console.log('error on readable stream', error);
  }
});

readableStream.on('end', () => {
  console.log('done');
});
