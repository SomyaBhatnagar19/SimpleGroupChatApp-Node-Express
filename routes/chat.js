/* Importing */
const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const chatMessagesController = require('../controllers/chatMessages')

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

// Middleware for chatting or messages writing and showing
router.get('/Welcome', (req, res) => {
  // Retrieve the username and email from cookies
  const username = req.cookies.username || 'Guest';

  // Read messages from all user files
  const allMessages = Object.values(req.userMessageFiles).map((filePath) => {
    return fs.readFileSync(filePath, 'utf-8');
  });

  // Concatenate and split messages to display in the UI
  const messages = allMessages.join('\n').split('\n').filter(Boolean);
  res.sendFile(path.join(__dirname, '../', 'views', 'Chat.html'));
});

// Handle the form submission in the '/Welcome' route
router.post('/Welcome', chatMessagesController.getChatMessages);

/* exports */
module.exports = router;
