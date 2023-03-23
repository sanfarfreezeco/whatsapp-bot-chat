const { client } = require('../client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
const openai = new OpenAIApi(configuration);
const fs = require('fs');

function chat() {
    client.on('message', async (message) => {
        const contact = await message.getContact();
        const file = 'message/messageLogs/' + contact.id.user;
        if (fs.existsSync(file)) {
            let messages = [];
            let messagesOri = [];
            const prevFile = fs.readFileSync(file);
            const parseFile = JSON.parse(prevFile);
            if (parseFile <=! 15) {
                messagesOri = parseFile.slice(0, 15);
                messages = parseFile.slice(-15);
            } else {
                messages = parseFile;
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
                if (messagesOri <=! 15) {
                    messagesOri = messagesOri.concat(messages);
                    const json = JSON.stringify(messagesOri);
                    fs.writeFileSync(file, json);
                } else {
                    const json = JSON.stringify(message);
                    fs.writeFileSync(file, json);
                }
                client.sendMessage(message.from, reply.content);
            } catch (err) {
                console.log(err);
            }
        } if (!fs.existsSync(file) && message.body === '/start') {
            if (message.body === '/start') {
                return;
            } else {
                client.sendMessage(message.from, 'Please use /start to start a chat');
            }
        }
    });
}

module.exports = { chat };