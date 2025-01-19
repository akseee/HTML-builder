const path = require('path');
const fs = require('fs');

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), {
  encoding: 'ascii',
});

stream.on('data', (chunk) => console.log(chunk));
