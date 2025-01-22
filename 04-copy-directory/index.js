const fs = require('fs').promises;
const path = require('path');

const src = path.resolve(__dirname, 'files');
const des = path.resolve(__dirname, 'files-copy');

async function copyDir() {
  try {
    try {
      await fs.access(des);
      await fs.rm(des, { recursive: true });
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Unexpected error:', err);
      }
    }

    await fs.mkdir(des);
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
