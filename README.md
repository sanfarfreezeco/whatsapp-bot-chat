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

1. After run `npm run test` the QRCode will appear

2. Open WhatsApp on your phone

3. Tap triple dot on top right corner of your screen (Android) or Tap Setting bar on bottom right of your screen (iOS)
   
   <div style="text-align: center">
      
   ![image](https://cdn1.aurellyan.my.id/md_files/wa_a_triple_dot.png)
      
   Android
            
   ![image](https://cdn1.aurellyan.my.id/md_files/wa_i_setting_btn.jpeg)
   
   iOS

   </div>

4. Tap Linked Devices

   <div style="text-align: center">

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_a_linked_btn.png)
   
   Android

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_i_linked_btn.jpeg)

   iOS

   </div>
   
5. Tap Link a device
   
   <div style="text-align: center">

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_a_add-linked.png)
   
   Android

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_i_add-linked.jpeg)
   
   iOS

   </div>
   
6. Move your phone camera to QRCode

   <div style="text-align: center">

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_a_scan.jpg)

   Android

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_i_scan.jpeg)
   
   iOS

   </div>
   
7. Add name (if asked)

   <div style="text-align: center">

   ![image](https://cdn1.aurellyan.my.id/md_files/wa_a_linked-name.jpg)

   </div>

## Update

- [x] Added `/stop` to stop the chat (last chat will saved to `./message/messageLogs/stoppedChats/`)
- [x] Not sending message from WhatsApp Statuses
- [x] `./message/messageLogs/` now easier to read
- [x] Added `/history` to show stopped chat history
- [x] Added `/history show [list number]` to show chat on stopped chat history based on list number