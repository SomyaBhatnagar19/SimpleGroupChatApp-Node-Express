const fs = require('fs');

class ChatModel {
    constructor(userMessage) {
        // Initialize userMessage to an empty object if it's undefined or null
        this.userMessage = userMessage || {};
    }
    saveMessage(username, message) {
        const messageFilePath = `C:\\Users\\somya\\Downloads\\simpleChatApp-node-expressjs\\messages_${username}.txt`;
    
        try {
          fs.appendFileSync(messageFilePath, `${username}: ${message}\n`);
        } catch (err) {
          console.error('Error appending message:', err);
          throw new Error('Error appending message.');
        }
      }
    
      getAllMessages(username) {
        const messageFilePath = `C:\\Users\\somya\\Downloads\\simpleChatApp-node-expressjs\\messages_${username}.txt`;
    
        try {
          const messages = fs.readFileSync(messageFilePath, 'utf-8');
          return messages.split('\n').filter(Boolean);
        } catch (err) {
          console.error('Error reading messages:', err);
          return [];
        }
      }
    }
    
    module.exports = ChatModel;
