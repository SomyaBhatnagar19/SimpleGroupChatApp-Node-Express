// controllers/chatMessages.js
const fs = require('fs');
const chatModel = require('../models/chatModel');

// Create an instance of ChatModel
const chat = new chatModel();

exports.getChatMessages = (req, res) => {
  const username = req.cookies.username || 'Guest';
  const messages = chat.getAllMessages(username); // Pass the username to getAllMessages

  res.render('Chat', { username, messages });
};

exports.postChatMessages = (req, res) => {
  const username = req.cookies.username || 'Guest';
  const message = req.body.message;

  // Save message using ChatModel
  chat.saveMessage(username, message);

  // Get updated messages after saving
  const messages = chat.getAllMessages(username); // Pass the username to getAllMessages

  // Pass messages to the template
  res.render('Chat', { username, messages });
};
