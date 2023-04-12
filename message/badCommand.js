const { client } = require('../client');

function badCommand() {
    client.on('message', async (message) => {
        if (message.body.slice(0, 1) === '/') {
            if (message.body === '/') {
                await client.sendMessage(message.from, 'Please insert command');
                await client.sendMessage(message.from, 'Use /start to start chat\nUse /help to show help');
            } else if (
                message.body.slice(0, 5) !== '/help' &&
                message.body.slice(0, 6) !== '/start' &&
                message.body.slice(0, 5) !== '/stop' &&
                message.body.slice(0, 8) !== '/history' &&
                message.body.slice(0, 6) !== '/image' &&
                message.body.slice(0, 8) !== '/sticker' &&
                message.body.slice(0, 5) !== '/test'
            ) {
                const arg = message.body;
                await client.sendMessage(message.from, 'Bad command `' + arg + '`');
                await client.sendMessage(message.from, 'Use /help to show help');
            }
        }
    });
}

module.exports = { badCommand };