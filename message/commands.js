const { client } = require('../client');
const fs = require('fs');
const date = require('date-and-time');

function commands() {
    client.on('message', async (message) => {
        const contact = await message.getContact();
        let file = 'message/messageLogs/' + contact.id.user;
        const now = new Date();
        const calendar = date.format(now, 'dddd, MMMM DD YYYY HH:mm:ss.SSS [UTC]ZZ');
        if (message.from.slice(-5) === '@g.us') {
            file = 'message/messageLogs/groups/' + message.from.slice(0, -5);
        }
        if (message.body.slice(0, 7) === '/start ') {
            const arg = message.body.slice(7);
            await client.sendMessage(message.from, 'Error command argument `' + arg + '`\nPlease use /start to start chat');
        }
        if (message.body === '/start') {
            if (fs.existsSync(file)) {
                await client.sendMessage(message.from, 'You are already started a chat');
            } else {
                if (message.from.slice(-5) === '@g.us') {
                    fs.writeFileSync(file + '.usr', fs.readFileSync('message/messageLogs/groups/templateUser'));
                }
                const newMessages = JSON.parse(fs.readFileSync('message/messageLogs/template'));
                const createDate = {"create_at": calendar, "last_chatting": calendar, "stopped_at": "null"};
                newMessages.splice(0, 0, createDate);
                const json = JSON.stringify(newMessages, null, 4);
                fs.writeFileSync(file, json);
                await client.sendMessage(message.from, 'Ready!\nUse /stop to stop chat');
            }
        }

        let i = 1;
        let iMax = 9999;
        let fileOld;
        let masterStopFolder = 'message/messageLogs/stoppedChats/';
        let folderStop = 'message/messageLogs/stoppedChats/' + contact.id.user + '/';
        if (message.from.slice(-5) === '@g.us') {
            masterStopFolder = 'message/messageLogs/groups/stoppedChats/';
            folderStop = 'message/messageLogs/groups/stoppedChats/' + message.from.slice(0, -5) + '/';
        }
        if (message.body.slice(0, 6) === '/stop ') {
            const arg = message.body.slice(6);
            await client.sendMessage(message.from, 'Error command argument `' + arg + '`\nPlease use /stop to stop chat');
        }
        if (message.body === '/stop') {
            if (!fs.existsSync(file)){
                await client.sendMessage(message.from, 'You did\'nt start the chat\nPlease use /start to start a chat');
            } else {
                if (!fs.existsSync(folderStop)) {
                    if (!fs.existsSync(masterStopFolder)) {
                        fs.mkdirSync(masterStopFolder);
                    }
                    fs.mkdirSync(folderStop);
                }
                while (i < iMax) {
                    fileOld = folderStop + contact.id.user + '.' + i;
                    if (message.from.slice(-5) === '@g.us') {
                        fileOld = folderStop + message.from.slice(0, -5) + '.' + i;
                    }
                    if (!fs.existsSync(fileOld)) {
                        break;
                    }
                    i++;
                }
                if (message.from.slice(-5) === '@g.us') {
                    fs.renameSync(file + '.usr', fileOld + '.usr');
                }
                const oldMessages = JSON.parse(fs.readFileSync(file));
                oldMessages[0].stopped_at = calendar;
                const json = JSON.stringify(oldMessages, null, 4);
                fs.writeFileSync(fileOld, json);
                fs.rmSync(file);
                await client.sendMessage(message.from, 'Chat was stopped');
                await client.sendMessage(message.from, 'To start chat again please use /start again');
            }
        }

        let listHistory = [];
        if (message.body.slice(0, 9) === '/history ') {
            if (message.body !== '/history show' &&
                message.body.slice(0, 14) !== '/history show ') {
                const arg = message.body.slice(9);
                await client.sendMessage(message.from, 'Error command argument `' + arg + '`\nPlease use /history to show stopped chat history');
            }
        }
        if (message.body === '/history') {
            if (!fs.existsSync(folderStop)) {
                await client.sendMessage(message.from, 'You don\'t have any chat history!');
            } else {
                while (i < iMax) {
                    fileOld = folderStop + contact.id.user + '.' + i;
                    if (message.from.slice(-5) === '@g.us') {
                        fileOld = folderStop + message.from.slice(0, -5) + '.' + i;
                    }
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
                await client.sendMessage(message.from, 'Chat history\n\n' + listHistory.join('\n'));
                await client.sendMessage(message.from, 'Use /history show [list number]\nTo show chat history from your list');
            }
        }
        if (message.body === '/history show') {
            if (!fs.existsSync(folderStop)) {
                await client.sendMessage(message.from, 'You don\'t have any chat history!');
            } else {
                await client.sendMessage(message.from, 'Please insert the number of your chat history\nExample: /history show 1\nTo show number 1 of chat history from your list');
                await client.sendMessage(message.from, 'Use: /history\nTo see list of your chat history');
            }
        }
        if (message.body.slice(0, 14) === '/history show ') {
            if (!fs.existsSync(folderStop)) {
                await client.sendMessage(message.from, 'You don\'t have any chat history!');
            } else {
                const n = message.body.slice(14);
                let fileHistory = folderStop + contact.id.user + '.' + n;
                if (message.from.slice(-5) === '@g.us') {
                    fileHistory = folderStop + message.from.slice(0, -5) + '.' + n;
                }
                if (!fs.existsSync(fileHistory)) {
                    await client.sendMessage(message.from, 'Number ' + n + ' not found on your chat history list!');
                    await client.sendMessage(message.from, 'Use: /history\nTo see list of your chat history');
                } else {
                    const parseHistory = JSON.parse(fs.readFileSync(fileHistory)).slice(2);
                    const parseHistoryDate = JSON.parse(fs.readFileSync(fileHistory)).slice(0, 1);
                    let parseGroupUser;
                    if (message.from.slice(-5) === '@g.us') {
                        parseGroupUser = JSON.parse(fs.readFileSync(fileHistory + '.usr')).slice(1);
                    }
                    let a = 0;
                    const chats = [];
                    while (a < parseHistory.length) {
                        let author;
                        let msg = parseHistory[a].content;
                        if (parseHistory[a].role === 'user') {
                            author = contact.pushname;
                            if (message.from.slice(-5) === '@g.us') {
                                author = parseGroupUser[a].user;
                            }
                        }
                        if (parseHistory[a].role === 'assistant') {
                            author = client.info.pushname;
                            if (message.from.slice(-5) === '@g.us') {
                                author = author + " [" + client.info.wid.user + "]";
                            }
                        }
                        chats.push(author + ': ' + msg);
                        a++;
                    }
                    await client.sendMessage(message.from, 'Last Chats: ' + parseHistoryDate[0].last_chatting + '\nStopped At: ' + parseHistoryDate[0].stopped_at + '\n\n' + chats.join('\n\n====================\n\n'));
                }
            }
        }
    });
}

module.exports = { commands };