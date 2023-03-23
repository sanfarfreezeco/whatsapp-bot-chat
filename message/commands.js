const { client } = require('../client');
const fs = require('fs');

function commands() {
    client.on('message', async (message) => {
        const contact = await message.getContact();
        const file = 'message/messageLogs/' + contact.id.user;
        if (message.body === '/start') {
            if (fs.existsSync(file)) {
                client.sendMessage(message.from, 'You are already started a chat');
            } else {
                const newMessages = fs.readFileSync('message/messageLogs/template');
                fs.writeFileSync(file, newMessages);
                client.sendMessage(message.from, 'Ready!');
            }
        }
    });
}

module.exports = { commands };