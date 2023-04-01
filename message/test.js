const { client } = require('../client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const date = require('date-and-time');

function testMsg() {
    client.on('message', async (message) => {
        if (message.body === '/test') {
        }

        if (message.body === '/test2') {
        }

        if (message.body === '/test3') {
        }
    });
}

module.exports = { testMsg };