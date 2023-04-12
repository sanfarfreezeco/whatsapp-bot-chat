const { client } = require('../client');

function help() {
    client.on('message', async (message) => {
        if (message.body.slice(0, 6) === '/help ') {
            const arg = message.body.slice(6);
            await client.sendMessage(message.from, 'Error command argument `' + arg + '`\nPlease use /help to show help');
        }
        if (message.body === '/help') {
            await client.sendMessage(message.from,
                'Commands:\n\n' +
                '/start = Start a chat\n' +
                '/stop = Stop a chat\n' +
                '/help = Show this help message\n' +
                '/history = Show list of stopped chat\n' +
                '/history show [list number] = Show stopped chat history from list number\n' +
                '/image [your description] = Create image from your description\n' +
                '\n\nWith Media:\n\n' +
                '/image = Create image variation from your image you attached\n' +
                '/sticker [sticker name] = Create sticker from your image you attached, [sticker name] is optional'
            );
        }
    });
}

module.exports = { help };