const { client } = require('../client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const date = require('date-and-time');

function chat() {
    client.on('message', async (message) => {
        const contact = await message.getContact();
        const file = 'message/messageLogs/' + contact.id.user;
        if (message.from === 'status@broadcast') return;
        if (message.body !== '/start' &&
            message.body !== '/stop' &&
            message.body !== '/history' &&
            message.body !== '/history show' && message.body.slice(0, 14) !== '/history show ' &&
            message.body !== '/test' &&
            message.body !== '/test2' &&
            message.body !== '/test3') {
            if (fs.existsSync(file)) {
                let messages;
                let messagesOri = [];
                const now = new Date();
                const calendar = date.format(now, 'dddd, MMMM DD YYYY HH:mm:ss.SSS [UTC]ZZ');
                const prevFile = fs.readFileSync(file);
                const parseFile = JSON.parse(prevFile);
                let chatDate = parseFile.slice(0, 1);
                chatDate[0].last_chatting = calendar;
                const chat = parseFile.slice(1, parseFile.length);
                if (chat.length > 15) {
                    messagesOri = chat.slice(0, -15);
                    messages = chat.slice(-15);
                } else {
                    messages = chat;
                }
                try {
                    const input = message.body;
                    messages.push({
                        role: "user",
                        content: input
                    });
                    const completion = await openai.createChatCompletion({
                        model: 'gpt-3.5-turbo',
                        messages: messages
                    });
                    const reply = completion.data.choices[0].message;
                    messages.push(reply);
                    if (chat.length > 15) {
                        chatDate = chatDate.concat(messagesOri);
                        messagesOri = chatDate;
                        messagesOri = messagesOri.concat(messages);
                        const json = JSON.stringify(messagesOri, null, 4);
                        fs.writeFileSync(file, json);
                    } else {
                        chatDate = chatDate.concat(messages);
                        messages = chatDate;
                        const json = JSON.stringify(messages, null, 4);
                        fs.writeFileSync(file, json);
                    }
                    client.sendMessage(message.from, reply.content);
                } catch (err) {
                    console.log(err);
                }
            }
            if (!fs.existsSync(file)) {
                client.sendMessage(message.from, 'Please use /start to start a chat');
            }
        }
    });
}

module.exports = { chat };