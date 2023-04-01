# WhatsApp Chat Bot with OpenAI API

## Install Instruction

1. Install Node.js

   [Download Here](https://nodejs.org/en/download/)

2. Clone this repository

    1. Using git clone

       ```shell
       git clone https://github.com/sanfarfreezeco/whatsapp-bot-chat.git
       ```

    2. Using zip file

       Click 'Code' on the right of repository

       ![image](https://cdn1.aurellyan.my.id/md_files/github_code-btn.png)

       Then click 'Download Zip' to download the code

       ![image](https://cdn1.aurellyan.my.id/md_files/github_download_zip-btn.png)

       After download finished, extract it

3. Open this folder code, then make new file `.env`

4. Copy this code into `.env`

   ```text
   OPENAI_API=<your_openai_api_token>
   ```

   Change the `<your_openai_api_token>` with your OpenAI API token

5. Install module from `package.json`

   ```shell
   npm install
   ```

6. Run this code using node.js

   ```shell
   npm run test
   ```

## QRCode Connection

[How to login WhatsApp using QRCode Connection](QRConnection.md)

## Features

- `/start` Start a chat
- `/stop` Stop a chat
- `/help` Show this help message
- `/history` Show list of stopped chat
  - `/history` show [list number] Show stopeed chat history from list number

## Update

March 24, 2023

- [x] Added `/stop` to stop the chat

  - Stopped chat will saved to `./message/messageLogs/stoppedChats/`

March 28, 2023

- [x] Not sending message from WhatsApp Statuses

March 31, 2023

- [x] `./message/messageLogs/` now easier to read
- [x] Added `/history` to show stopped chat history

April 1, 2023

- [x] Added `/history show [list number]` to show chat on stopped chat history based on list number
- [x] Added `/help` command
- [x] Added feature to chat on Group Chat
  - Chat log will saved to `./message/messageLogs/groups/`
  - Stopped chats will saved to `./message/messageLogs/groups/stoppedChats`
  - Chat log saving user name with filename `./message/messageLogs/groups/[group id].usr`