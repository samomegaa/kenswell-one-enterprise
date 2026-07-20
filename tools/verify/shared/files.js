'use strict';

const fs = require('fs');
const path = require('path');

function requireFile(root, relativePath) {
  const absolutePath = path.join(
    root,
    relativePath
  );

  if (!fs.existsSync(absolutePath)) {
    throw new Error(
      `Missing required file: ${relativePath}`
    );
  }

  return absolutePath;
}

function readFile(root, relativePath) {
  return fs.readFileSync(
    requireFile(root, relativePath),
    'utf8'
  );
}

module.exports = Object.freeze({
  requireFile,
  readFile,
});
