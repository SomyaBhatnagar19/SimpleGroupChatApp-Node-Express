// routes/chat.js
const express = require('express');
const router = express.Router();
const chatMessagesController = require('../controllers/chatMessages');

// Middleware for chatting or messages writing and showing
router.route('/Welcome')
  .get(chatMessagesController.getChatMessages)
  .post(chatMessagesController.postChatMessages);

module.exports = router;


// /* Importing */
// const path = require('path');
// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const fs = require('fs');

// const chatMessagesController = require('../controllers/chatMessages')

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(cookieParser());

// // Middleware for chatting or messages writing and showing
// router.post('/Welcome', chatMessagesController.postChatMessages);

// // Handle the form submission in the '/Welcome' route
// router.post('/Welcome', chatMessagesController.getChatMessages);

// /* exports */
// module.exports = router;
