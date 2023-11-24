/* This file is a controller to store the logic of appending the message */
const fs = require('fs');
exports.getChatMessages= (req, res) => {
    const username = req.cookies.username || 'Guest';
    const message = req.body.message;
  
    // Ensure that the user's file path is defined
    const messageFilePath = req.userMessageFiles[username];
    if (!messageFilePath) {
      return res.status(500).send('Error: User file path is undefined.');
    }
  
    try {
      fs.appendFileSync(messageFilePath, `${username}: ${message}\n`);
      res.redirect('/chat/Welcome');
    } catch (error) {
      console.error('Error appending message:', error);
      res.status(500).send('Error appending message.');
    }
  }