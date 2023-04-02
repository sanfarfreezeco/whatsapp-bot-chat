const { client, MessageMedia } = require('../client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
const openai = new OpenAIApi(configuration);

function imageGen() {
    client.on('message', async (message) => {
        if (message.body === '/image') {
            await client.sendMessage(message.from, 'Please insert description of image what you want to generate\nExample: /image An Elephant Riding a Motorcycle');
        }
        if (message.body.slice(0, 7) === '/image ') {
            try {
                await (await message.getChat()).sendStateTyping();
                const desc = message.body.slice(6);
                const response = await openai.createImage({
                    prompt: desc,
                    n: 1,
                    size: "1024x1024"
                });
                const image = response.data.data[0].url;
                await client.sendMessage(message.from, await MessageMedia.fromUrl(image));
            } catch (err) {
                if (err.code === 'ECONNRESET') {
                    await client.sendMessage(message.from, 'Error Connection to OpenAI\nPlease try again later');
                } else {
                    console.log(err);
                }
            }
        }
    });
}

module.exports = { imageGen };