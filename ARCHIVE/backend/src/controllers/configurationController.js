module.exports = async function (fastify, opts) {
    const {
      getAllLiquids,
      getAllBeverages,
      getConfiguration,
      changeConfiguration,
      getPossibleBeverages
    } = require('../handlers/configurationHandler');
  

    fastify.get('/allLiquids', async (req, reply) => {
      const data = await getAllLiquids();
      return data;
    });
  
    fastify.get('/allBeverages', async (req, reply) => {
      const data = await getAllBeverages();
      return data;
    });

    fastify.get('/getPossibleBeverages', async (req, reply) => {
      const data = await getPossibleBeverages();
      return data;
    });
  
    fastify.get('/getConfiguration', async (req, reply) => {
      const data = await getConfiguration();
      return data;
    });
  
    fastify.put('/changeConfiguration', async (req, reply) => {
      console.log('Received request to change configuration:', req.body);
      const updated = await changeConfiguration(req.body);
      return updated;
    });
  };
  