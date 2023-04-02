const { badCommand } = require('./message/badCommand');
const { chat } = require('./message/chat');
const { commands } = require('./message/commands');
const { help } = require('./message/help');
const { testMsg } = require('./message/test');

const { imageGen } = require('./message/imageGen');

function loader() {
    badCommand();
    chat();
    commands();
    help();
    testMsg();

    imageGen();
}

module.exports = { loader };