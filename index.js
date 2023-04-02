const qrcode = require('qrcode-terminal');
const { client } = require('./client');
client.initialize();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
    console.log('authenticated!');
});

client.on('ready', () => {
    console.log('ready!');
});

client.on('group_join', async (group) => {
    await client.sendMessage(group.chatId, 'Hello i\'m ' + client.info.pushname);
    await client.sendMessage(group.chatId, 'I\'m a bot\nSo you can chat with me in this group with /start command\nYour chat will not interrupted by me until you start the chat using /start command');
    await client.sendMessage(group.chatId, 'You can stop chat with me in this group with /stop command\nSo you can talk each other without interrupted by me');
});

client.on('group_leave', async (group) => {
    const groupChat = (await group.getChat()).name;
    await client.sendMessage(group.author, 'You just removed me from ' + groupChat + '\nIf you want to invite me back to your group. I\'ll feel free to accept it');
});

const { loader } = require('./msgLoader');
loader();
