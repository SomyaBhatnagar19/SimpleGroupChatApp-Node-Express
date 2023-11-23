/* Importing */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

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

  res.send(`
    <html>
      <h3>Welcome ${username} !!</h3>
      <p>Email: <span id="userEmail"></span></p>
      <form method="post" action="/chat/Welcome"> 
        <label>
          Write your message:
        </label>
        <input type="text" name="message">
        <button type="submit">Send Message</button>
      </form>
      <ul>
        ${messages.map((msg) => `<li>${msg}</li>`).join('')}
      </ul>
      <script>
        // Set the email in local storage
        const userEmail = localStorage.getItem('email');
        document.getElementById('userEmail').innerText = userEmail;
      </script>
    </html>
  `);
});

// Handle the form submission in the '/Welcome' route
router.post('/Welcome', (req, res) => {
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
});

/* exports */
module.exports = router;
