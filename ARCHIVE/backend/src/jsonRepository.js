const fs = require('fs-extra');
const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');

//#region  CONFIGURATION I/O 

async function readLiquids() {
  const fullPath = path.join(dataDir, "liquids.json");
  return fs.readJson(fullPath);
}

async function readBeverages() {
  const fullPath = path.join(dataDir, "beverages.json");
  return fs.readJson(fullPath);
}

async function readConfigs() {
    const fullPath = path.join(dataDir, "activeSetup.json");

    try {
      // fs.readJson will throw if invalid JSON or file missing
      return await fs.readJson(fullPath);
    } catch (err) {
      // If the file does not exist or content isn’t valid JSON,
      // return the default (empty object) instead of throwing.
      if (err.code === 'ENOENT' || err.name === 'JSONError' || err instanceof SyntaxError) {
        return defaultValue;
      }
      // Re‑throw unexpected errors
      throw err;
    }
}

async function writeConfigs(data) {
    const fullPath = path.join(dataDir, "activeSetup.json");
    return fs.writeJson(fullPath, data, { spaces: 2 });
}
//#endregion

//#region STATUS I/O

//#endregion


module.exports = { readLiquids, readBeverages, readConfigs, writeConfigs };