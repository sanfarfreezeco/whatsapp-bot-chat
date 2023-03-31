const { client } = require('../client');
const fs = require('fs');
const date = require('date-and-time');

function commands() {
    client.on('message', async (message) => {
        const contact = await message.getContact();
        const file = 'message/messageLogs/' + contact.id.user;
        const now = new Date();
        const calendar = date.format(now, 'dddd, MMMM DD YYYY HH:mm:ss.SSS [UTC]ZZ');
        if (message.body === '/start') {
            if (fs.existsSync(file)) {
                client.sendMessage(message.from, 'You are already started a chat');
            } else {
                const newMessages = JSON.parse(fs.readFileSync('message/messageLogs/template'));
                const createDate = {"create_at": calendar, "last_chatting": calendar, "stopped_at": "null"};
                newMessages.splice(0, 0, createDate);
                const json = JSON.stringify(newMessages, null, 4);
                fs.writeFileSync(file, json);
                client.sendMessage(message.from, 'Ready!\nUse /stop to stop chat');
            }
        }

        let i = 1;
        let iMax = 9999;
        let fileOld;
        const folderStop = 'message/messageLogs/stoppedChats/' + contact.id.user + '/';
        if (message.body === '/stop') {
            if (!fs.existsSync(folderStop)) {
                fs.mkdirSync(folderStop);
            }
            while (i < iMax) {
                fileOld = folderStop + contact.id.user + '.' + i;
                if (!fs.existsSync(fileOld)) {
                    break;
                }
                i++;
            }
            const oldMessages = JSON.parse(fs.readFileSync(file));
            oldMessages[0].stopped_at = calendar;
            const json = JSON.stringify(oldMessages, null, 4);
            fs.writeFileSync(fileOld, json);
            fs.rmSync(file);
            client.sendMessage(message.from, 'Chat was stopped');
            client.sendMessage(message.from, 'To start chat again please use /start again');
        }

        let listHistory = [];
        if (message.body === '/history') {
            if (!fs.existsSync(folderStop)) {
                client.sendMessage(message.from, 'You don\'t have any chat history!');
            } else {
                while (i < iMax) {
                    fileOld = folderStop + contact.id.user + '.' + i;
                    if (!fs.existsSync(fileOld)) {
                        i--;
                        break;
                    } else {
                        const historyFile = fs.readFileSync(fileOld);
                        const parseHistory = JSON.parse(historyFile);
                        listHistory.push(i + '.\nStopped At: ' + parseHistory[0].stopped_at + '\nLast chat: ' + parseHistory[parseHistory.length - 2].content);
                        i++;
                    }
                }
                client.sendMessage(message.from, 'Chat history\n\n' + listHistory.join('\n'));
            }
        }
    });
}

module.exports = { commands };