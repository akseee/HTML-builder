const readline = require('readline');

const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writableStream = fs.createWriteStream(
  path.resolve(__dirname, 'text.txt'),
);

let counted = 0;

console.log(
  'Hello! \nI didnt create anything cool so lets just call all the animals you know! \nType "exit" or press Ctrl+C to finish.\n',
);

rl.on('line', (input) => {
  if (input.trim().toLowerCase() === 'exit') {
    shutDown();
  } else {
    counted += 1;
    writableStream.write(`${input}\n`);
  }
});

rl.on('SIGINT', () => {
  shutDown();
});

function shutDown() {
  console.log(
    `\nSee ya next time! You counted ${counted} animals! Have a great day:) \nThe file text.txt is gonna be deleted`,
  );
  rl.close();
  writableStream.end();
  fs.rm(path.resolve(__dirname, 'text.txt'), (err) => {
    if (err) {
      return err;
    }
  });
}
