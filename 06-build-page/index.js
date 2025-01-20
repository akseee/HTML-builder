const fs = require('fs');
const path = require('path');

const des = path.resolve(__dirname, 'project-dist');

const desHTMLFile = path.join(des, 'index.html');
const desCSSFile = path.join(des, 'style.css');
const desAssetsDir = path.join(des, 'assets');

const components = path.resolve(__dirname, 'components');

const builder = async () => {
  fs.mkdir(des, { recursive: true }, (err) => {
    if (err) console.log(err);

    copyDir(desAssetsDir, path.resolve(__dirname, 'assets'));
    copyStyles(desCSSFile, path.resolve(__dirname, 'styles'));
    writeLayout(
      desHTMLFile,
      path.resolve(__dirname, 'template.html'),
      components,
    );
  });
};

function writeLayout(destination, source, templates) {
  let layout = '';

  fs.readFile(source, 'utf-8', (err, html) => {
    if (err) console.log(err);
    layout = html;

    fs.readdir(
      templates,
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) console.log(err);
        let templatesAmount = files.length;

        files.forEach((file) => {
          const template = path.parse(file.name).name;

          fs.readFile(
            path.resolve(templates, file.name),
            'utf-8',
            (err, fileData) => {
              if (err) console.log(err);
              const content = fileData;
              layout = layout.replaceAll(`{{${template}}}`, content);
              templatesAmount -= 1;
              if (templatesAmount === 0) {
                fs.writeFile(path.resolve(destination), layout, (err) => {
                  if (err) console.log(err);
                });
              }
            },
          );
        });
      },
    );
  });
}

function copyDir(destination, source) {
  fs.mkdir(destination, { recursive: true }, (err) => {
    if (err) console.log(err);
    fs.readdir(
      source,
      {
        withFileTypes: true,
      },
      (err, files) => {
        if (err) console.log(err);
        for (let file of files) {
          if (file.isDirectory()) {
            copyDir(
              path.join(destination, file.name),
              path.join(source, file.name),
            );
          } else {
            const srcFile = path.join(source, file.name);
            const desFile = path.join(destination, file.name);
            fs.copyFile(srcFile, desFile, (err) => {
              if (err) console.log(err);
            });
          }
        }
      },
    );
  });
}

function copyStyles(destination, source) {
  fs.unlink(destination, (err) => {
    if (err && err.code !== 'ENOENT') {
      console.log(err);
    }
    fs.readdir(source, { withFileTypes: true }, (err, files) => {
      if (err) console.log(err);

      const filesArr = files.filter((file) => {
        return file.isFile() && path.extname(file.name) === '.css';
      });

      const writableStream = fs.createWriteStream(destination);

      filesArr.forEach((file) => {
        const filePath = path.join(source, file.name);

        fs.readFile(filePath, { encoding: 'utf-8' }, (err, fileData) => {
          if (err) console.log(err);
          writableStream.write(fileData + '\n');
        });
      });
    });
  });
}

builder();
