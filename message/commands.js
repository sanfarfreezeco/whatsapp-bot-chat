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
                client.sendMessage(message.from, 'Ready!\nUse /stop to stop chat');
            }
        }
        let i = 1;
        let iMax = 9999;
        let fileOld;
        if (message.body === '/stop') {
            while (i < iMax) {
                fileOld = 'message/messageLogs/stoppedChats/' + contact.id.user + '.' + i;
                if (!fs.existsSync(fileOld)) {
                    break;
                }
                i++;
            }
            const oldMessages = fs.readFileSync(file);
            fs.writeFileSync(fileOld, oldMessages);
            fs.rmSync(file);
            client.sendMessage(message.from, 'Chat was stopped');
            client.sendMessage(message.from, 'To start chat again please use /start again');
        }
    });
}

module.exports = { commands };