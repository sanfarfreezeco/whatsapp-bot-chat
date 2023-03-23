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

const { loader } = require('./msgLoader');
loader();
