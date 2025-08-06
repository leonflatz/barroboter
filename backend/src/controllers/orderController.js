module.exports = async function (fastify, opts) {
    const {
        GetNextDrink,
        FinishedDrink,
        ReceiveOrder,
        DeleteOrder
    } = require('../handlers/orderHandler');

    //#region Endpoints for Comm with Frontend
    fastify.post('/postOrder', async (req, reply) => {
        const order = req.query.orderId;
        console.log('Received order from frontend:', order);
        const result = await ReceiveOrder(order);
        return result;
    });

    fastify.put('/deleteOrder', async (req, reply) => {
        const orderId = req.body.orderId;
        console.log('Received request to delete order with ID:', orderId);
        const result = await DeleteOrder(orderId);
        return result;
    });
    //#endregion

    //#region Endpoints for Comm with Controller
    fastify.get('/getNextDrink', async (req, reply) => {
        console.log('Received request for next drink');
        const nextDrink = await GetNextDrink();
        return nextDrink;
    });

    fastify.post('/finishedDrink', async (req, reply) => {
        const drinkId = req.body.drinkId;
        console.log('Received request to mark drink as finished with ID:', drinkId);
        const result = await FinishedDrink(drinkId);
        return result;
    });
    //#endregion

}