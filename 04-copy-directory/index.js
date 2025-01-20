const fs = require('fs').promises;
const path = require('path');

const src = path.resolve(__dirname, 'files');
const des = path.resolve(__dirname, 'files-copy');

async function copyDir() {
  try {
    await fs.mkdir(des, { recursive: true });
    const files = await fs.readdir(src, {
      withFileTypes: true,
    });

    for (let file of files) {
      const srcFile = path.join(src, file.name);
      const desFile = path.join(des, file.name);

      await fs.copyFile(srcFile, desFile);
    }
  } catch (err) {
    console.log(err);
  }
}

copyDir();
