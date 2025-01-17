const fs = require('fs').promises;
const path = require('path');

const idealStructure = {
  src: {
    components: {},
    'back-end': {},
    'front-end': {},
    'middle-end': {},
    styles: {},
    types: {},
    utils: {},
    'App.tsx': null,
    'main.tsx': null,
    'index.css': null,
  },
  public: {
    'index.html': null,
  },
  tests: {
    'back-end': {},
    'front-end': {},
    'middle-end': {},
    utilities: {},
  },
  'vite.config.ts': null,
  'tsconfig.json': null,
  'package.json': null,
  'README.md': null,
};

async function analyzeStructure(dir) {
  const structure = {};
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    if (item.isDirectory() && item.name !== 'node_modules') {
      structure[item.name] = await analyzeStructure(path.join(dir, item.name));
    } else if (item.isFile()) {
      structure[item.name] = null;
    }
  }
  return structure;
}

function compareStructures(current, ideal) {
  const missingDirs = [];
  const missingFiles = [];
  const unexpectedItems = [];

  for (const [key, value] of Object.entries(ideal)) {
    if (!(key in current)) {
      if (value === null) {
        missingFiles.push(key);
      } else {
        missingDirs.push(key);
      }
    } else if (value !== null) {
      const subResult = compareStructures(current[key], value);
      missingDirs.push(...subResult.missingDirs.map(subDir => path.join(key, subDir)));
      missingFiles.push(...subResult.missingFiles.map(subFile => path.join(key, subFile)));
      unexpectedItems.push(...subResult.unexpectedItems.map(item => path.join(key, item)));
    }
  }

  for (const key of Object.keys(current)) {
    if (!(key in ideal)) {
      unexpectedItems.push(key);
    }
  }

  return { missingDirs, missingFiles, unexpectedItems };
}

async function fixStructure(baseDir, { missingDirs, missingFiles, unexpectedItems }) {
  for (const dir of missingDirs) {
    await fs.mkdir(path.join(baseDir, dir), { recursive: true });
    console.log(`Created directory: ${dir}`);
  }

  for (const file of missingFiles) {
    const filePath = path.join(baseDir, file);
    if (!await fs.access(filePath).then(() => true).catch(() => false)) {
      await fs.writeFile(filePath, '');
      console.log(`Created file: ${file}`);
    }
  }

  for (const item of unexpectedItems) {
    console.log(`Unexpected item found: ${item}`);
  }
}

async function main() {
  try {
    console.log('Analyzing current project structure...');
    const currentStructure = await analyzeStructure('.');

    console.log('Comparing with ideal structure...');
    const comparison = compareStructures(currentStructure, idealStructure);

    console.log('Fixing project structure...');
    await fixStructure('.', comparison);

    console.log('Project structure update completed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();