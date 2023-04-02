const { client } = require('../client');

function badCommand() {
    client.on('message', async (message) => {
        if (message.body.slice(0, 1) === '/') {
            if (message.body === '/') {
                await client.sendMessage(message.from, 'Please insert command');
                await client.sendMessage(message.from, 'Use /start to start chat\nUse /help to show help');
            } else if (message.body !== '/help' &&
                message.body.slice(0, 6) !== '/help ' &&
                message.body !== '/start' &&
                message.body.slice(0, 7) !== '/start ' &&
                message.body !== '/stop' &&
                message.body.slice(0, 6) !== '/stop ' &&
                message.body !== '/history' &&
                message.body.slice(0, 9) !== '/history ' &&
                message.body !== '/image' &&
                message.body.slice(0, 7) !== '/image ' &&
                message.body.slice(0, 5) !== '/test') {
                const arg = message.body;
                await client.sendMessage(message.from, 'Bad command `' + arg + '`');
                await client.sendMessage(message.from, 'Use /help to show help');
            }
        }
    });
}

module.exports = { badCommand };