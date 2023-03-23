const { client } = require('../client');

function testMsg() {
    client.on('message', async (message) => {
    });
}

module.exports = { testMsg };