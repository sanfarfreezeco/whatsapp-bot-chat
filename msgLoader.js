const { badCommand } = require('./message/badCommand');
const { chat } = require('./message/chat');
const { commands } = require('./message/commands');
const { testMsg } = require('./message/test');

function loader() {
    badCommand();
    chat();
    commands();
    testMsg();
}

module.exports = { loader };