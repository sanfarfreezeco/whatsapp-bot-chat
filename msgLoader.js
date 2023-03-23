const { commands } = require('./message/commands');
const { chat } = require('./message/chat');
const { testMsg } = require('./message/test');

function loader() {
    chat();
    commands();
    testMsg();
}

module.exports = { loader };