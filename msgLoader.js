const { badCommand } = require('./message/badCommand');
const { chat } = require('./message/chat');
const { commands } = require('./message/commands');
const { help } = require('./message/help');
const { testMsg } = require('./message/test');

function loader() {
    badCommand();
    chat();
    commands();
    help();
    testMsg();
}

module.exports = { loader };