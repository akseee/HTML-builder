const path = require('path');
const fs = require('fs');

const folder = path.resolve(__dirname, 'secret-folder');

const readDirectory = (dirPath) => {
  fs.readdir(dirPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dirPath, file.name);

      if (file.isFile()) {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.log(err);
            return;
          }
          const fileName = file.name.replace(path.extname(file.name), '');
          const extName = path.extname(file.name).slice(1);
          const fileSize = (stats.size / 1024).toFixed(3);

          console.log(`${fileName} - ${extName} - ${fileSize}kb`);
        });
      } else if (file.isDirectory()) {
        readDirectory(filePath);
      }
    });
  });
};

readDirectory(folder);
