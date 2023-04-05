const { client, MessageMedia } = require('../client');
require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API = process.env.OPENAI_API;
const configuration = new Configuration({ apiKey: OPENAI_API });
const openai = new OpenAIApi(configuration);
const fs = require('fs');
const sharp = require('sharp');

function imageGen() {
    client.on('message', async (message) => {
        const contact = await message.getContact();
        if (message.body === '/image') {
            if (message.hasMedia) {
                const media = 'message/image_' + contact.id.user + '.png';
                const imageData = (await message.downloadMedia()).data;
                const imageBuffer = Buffer.from(imageData, 'base64');
                const imageBufferPNG = await sharp(imageBuffer).png().toBuffer();
                fs.writeFileSync(media, imageBufferPNG);
                for (let tries = 1; tries <= 5; tries++) {
                    try {
                        const response = await openai.createImageVariation(
                            fs.createReadStream(media),
                            1,
                            "1024x1024"
                        );
                        const image = response.data.data[0].url;
                        await client.sendMessage(message.from, await MessageMedia.fromUrl(image));
                        break;
                    } catch (err) {
                        if (tries === 5) {
                            if (err.code === 'ECONNRESET') {
                                await client.sendMessage(message.from, 'Error Connection to OpenAI\nPlease try again later');
                            } else if (err.response.status === 429) {
                                await client.sendMessage(message.from, 'Error: 429 Too Many Request\nPlease try again later');
                            } else {
                                console.log(err);
                                console.log(err.response.status);
                                console.log(err.response.data);
                            }
                        } else if (err.response.status === 400) {
                            await client.sendMessage(message.from, 'Error: 400 Bad Request (' + err.response.data.error.message + ')\nPlease use a square image size');
                            break;
                        }
                    }
                    console.log('tries = ' + tries);
                }
                fs.rmSync(media);
            } else {
                await client.sendMessage(message.from, 'Please insert description of image what you want to generate\nExample: /image An Elephant Riding a Motorcycle');
            }
        }
        if (message.body.slice(0, 7) === '/image ') {
            for (let tries = 1; tries <= 5; tries++) {
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
                    break;
                } catch (err) {
                    if (tries === 5) {
                        if (err.code === 'ECONNRESET') {
                            await client.sendMessage(message.from, 'Error Connection to OpenAI\nPlease try again later');
                        } else if (err.response.status === 429) {
                            await client.sendMessage(message.from, 'Error: 429 Too Many Request\nPlease try again later');
                        } else {
                            console.log(err);
                        }
                    }
                }
            }
        }
    });
}

module.exports = { imageGen };