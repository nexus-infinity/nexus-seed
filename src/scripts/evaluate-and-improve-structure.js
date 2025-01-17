const fs = require('fs').promises;
const path = require('path');

const idealStructure = {
  src: {
    'back-end': {},
    'front-end': {},
    'middle-end': {},
    components: {
      layout: {},
      scanner: {},
    },
    styles: {},
    types: {},
    utils: {},
    'App.tsx': null,
    'main.tsx': null,
  },
  public: {
    'index.html': null,
  },
  tests: {
    'back-end': {},
    'front-end': {},
    'middle-end': {},
    components: {},
    utils: {},
  },
  'package.json': null,
  'tsconfig.json': null,
  'vite.config.ts': null,
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
  const missingItems = [];
  const unexpectedItems = [];

  for (const [key, value] of Object.entries(ideal)) {
    if (!(key in current)) {
      missingItems.push(key);
    } else if (value !== null && typeof current[key] === 'object') {
      const subResult = compareStructures(current[key], value);
      missingItems.push(...subResult.missingItems.map(item => path.join(key, item)));
      unexpectedItems.push(...subResult.unexpectedItems.map(item => path.join(key, item)));
    }
  }

  for (const key of Object.keys(current)) {
    if (!(key in ideal)) {
      unexpectedItems.push(key);
    }
  }

  return { missingItems, unexpectedItems };
}

async function improveStructure(baseDir, { missingItems, unexpectedItems }) {
  for (const item of missingItems) {
    const itemPath = path.join(baseDir, item);
    if (path.extname(item)) {
      await fs.writeFile(itemPath, '');
      console.log(`Created file: ${item}`);
    } else {
      await fs.mkdir(itemPath, { recursive: true });
      console.log(`Created directory: ${item}`);
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

    console.log('Suggesting improvements...');
    await improveStructure('.', comparison);

    console.log('Evaluation and improvement suggestions completed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();

