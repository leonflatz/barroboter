const repo = require('../jsonRepository');


async function ReceiveOrder(order) {
    // order is expected to be a Beverage Id
    // Load current status
    const status = await repo.read('status.json');
    if (!status.InQueue) status.InQueue = [];

    // Generate a new unique ID for the order
    const newId = status.InQueue.length > 0
        ? Math.max(...status.InQueue.map(o => o.ID)) + 1
        : 1;

    // Add to InQueue
    status.InQueue.push({
        ID: newId,
        BeverageId: order,
        AtIndex: status.InQueue.length
    });

    // Save updated status
    await repo.write('status.json', status);

    return { success: true, ID: newId };
}

async function DeleteOrder(orderId) {
    // Placeholder for deleting an order
    // This function should handle the logic to remove the specified order
    console.log('Deleting order with ID:', orderId);
    // Here you would typically remove the order from a database or a file
}

async function GetNextDrink() {
    // Placeholder for getting the next drink to prepare
    // This function should return the next drink based on the current orders
    console.log('Fetching next drink to prepare');
    // Here you would typically fetch the next order from a queue or a database
}

async function FinishedDrink(drinkId) {
    // Placeholder for marking a drink as finished
    // This function should handle the logic to update the status of the specified drink
    console.log('Marking drink with ID as finished:', drinkId);
    // Here you would typically update the order status in a database or a file
}

async function StorageEmptied(){
    // here, webClient instance sends a simple request to the controller
    console.log('Storage has been emptied');
}

async function ConfigurationLoaded(){
    // here, webClient instance sends a post request to the controller containing the new configuration
    console.log('Configuration has been loaded');
}

module.exports = {
    ReceiveOrder,
    DeleteOrder,
    GetNextDrink,
    FinishedDrink
};

