const repo = require('../jsonRepository');

async function getAllLiquids() {
  return repo.readLiquids('liquids.json');
}

async function getAllBeverages() {
  return repo.readBeverages('beverages.json');
}

async function getConfiguration() {
  return repo.readConfigs('currentConfigs.json');
}

async function changeConfiguration(newConfig) {
  return repo.writeConfigs('currentConfigs.json', newConfig);
}
async function getPossibleBeverages() {
    const activeSetup = await getConfiguration();
    const beverages = await getAllBeverages();

    const possibleBeverages = beverages.filter(beverage => {
        return beverage.liquids.every(liquidId => activeSetup.liquidId.includes(liquidId));
    });

    return possibleBeverages;
}

module.exports = { getAllLiquids, getAllBeverages, getConfiguration, changeConfiguration, getPossibleBeverages };