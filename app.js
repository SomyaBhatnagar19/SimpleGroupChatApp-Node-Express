const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Dictionary to store users and their associated messages files
const userMessageFiles = {};

// Middleware to get the login details
app.get("/", (req, res) => {
  res.send(`
    <html>
      <form method="post" action="/Login">
        <h2>Login Page</h2>
        <label>Email Id: </label>
        <input type="email" name="email" id="email"/>
        <button type="submit">Login</button>
      </form>
    </html>
  `);
});

// Middleware to post the login details like username and store email in localStorage
app.post("/Login", (req, res) => {
  const email = req.body.email;

  // Extract the username from the email before '@'
  const username = email.split('@')[0];

  // Initialize or retrieve the user's messages file
  const messageFilePath = `messages_${username}.txt`;
  userMessageFiles[username] = messageFilePath;

  // Create the file if it doesn't exist
  if (!fs.existsSync(messageFilePath)) {
    fs.writeFileSync(messageFilePath, '');
  }

  // Set email in localStorage
  const script = `<script>
                      localStorage.setItem('email', '${email}');
                      window.location.href = '/Welcome';
                  </script>`;

  // Send a response with the script to set localStorage and redirect to '/Welcome'
  res.send(script);
});

// Middleware for chatting or messages writing and showing
app.get("/Welcome", (req, res) => {
  // Retrieve the username and email from cookies
  const username = req.cookies.username || 'Guest';

  // Read messages from all user files
  const allMessages = Object.values(userMessageFiles).map((filePath) => {
    return fs.readFileSync(filePath, 'utf-8');
  });

  // Concatenate and split messages to display in the UI
  const messages = allMessages.join('\n').split('\n').filter(Boolean);

  res.send(`
    <html>
      <h3>Welcome ${username} !!</h3>
      <p>Email: <span id="userEmail"></span></p>
      <form method="post" action="/Welcome">
        <label>
          Write your message:
        </label>
        <input type="text" name="message">
        <button type="submit">Send Message</button>
      </form>
      <ul>
        ${messages.map((msg) => `<li>${msg}</li>`).join("")}
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
app.post("/Welcome", (req, res) => {
  const username = req.cookies.username || 'Guest';
  const message = req.body.message;

  // Append the new message to the user's file
  const messageFilePath = userMessageFiles[username];
  fs.appendFileSync(messageFilePath, `${username}: ${message}\n`);

  res.redirect('/Welcome');
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
