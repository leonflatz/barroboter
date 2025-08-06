/*
Project: BarRobo Backend (Fastify + JSON storage)

Folder Structure:

├── data                    # JSON files for storage
│   ├── liquids.json
│   ├── beverages.json
│   ├── configs.json
│   └── currentConfigs.json
│
├── src                     # Source code
│   ├── index.js            # Fastify server setup (core logic only)
│   ├── jsonRepository.js   # Read/write JSON data
│   ├── handlers            # Business logic handlers
│   │   ├── configurationHandler.js
│   │   ├── orderHandler.js
│   │   └── statusHandler.js
│   └── controllers         # Endpoint definitions
│       ├── configurationController.js
│       ├── orderController.js
│       └── statusController.js
│
├── package.json
└── data.json               # (Optional combined for testing)
*/

const fastify = require('fastify')({ logger: true });
const cors = require('@fastify/cors');

const configurationController = require('./controllers/configurationController');



//const orderController = require('./controllers/orderController');
//const statusController = require('./controllers/statusController');

// Register routes
fastify.register(cors, {
  origin: '*', // Allow all origins (adjust as needed for production)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
});
fastify.register(configurationController, { prefix: '/config' });
// fastify.register(orderController, { prefix: '/order' });
// fastify.register(statusController, { prefix: '/status' });

fastify.get('/health', async (request, reply) => {
  try {
    reply.send({ status: 'healthy' });
  } catch (err) {
    reply.code(400).send({ status: 'unhealthy' });
  }
});


const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info('Server listening on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
