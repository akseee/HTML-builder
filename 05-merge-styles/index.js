// @ts-nocheck
const path = require('path');
const fs = require('fs');

const desFile = path.join(
  path.resolve(__dirname, 'project-dist'),
  'bundle.css',
);

const src = path.resolve(__dirname, 'styles');

const bundle = async () => {
  try {
    fs.unlink(desFile, (err) => {
      if (err && err.code !== 'ENOENT') {
        console.log(err);
      }
      fs.readdir(src, { withFileTypes: true }, (err, files) => {
        const filesArr = files.filter((file) => {
          return file.isFile() && path.extname(file.name) === '.css';
        });

        const writableStream = fs.createWriteStream(desFile);

        filesArr.forEach((file, i) => {
          const filePath = path.join(src, file.name);

          fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileData) => {
            if (err) {
              console.log(err);
            }
            writableStream.write(fileData + '\n');
          });
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

bundle();
