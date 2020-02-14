const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
    './dist/onlinebanking/runtime-es2015.js',
    './dist/onlinebanking/polyfills-es2015.js',
    './dist/onlinebanking/main-es2015.js',
  ]
  await fs.ensureDir('elements')
  await concat(files, 'elements/app-root.js');
  await fs.copyFile('./dist/onlinebanking/styles.css', 'elements/styles.css')
  await fs.copy('./dist/onlinebanking/assets/', 'elements/assets/' )
})()
