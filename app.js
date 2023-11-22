const express = require("express");
/* Initialising a file where the user messages can be stored */
const userMessageFiles = {};

const app = express();

/* Importing the files to route */
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');

// Ensure userMessageFiles is available in your routes
app.use((req, res, next) => {
  req.userMessageFiles = userMessageFiles;
  next();
});

app.use('/', loginRouter);
app.use('/chat', chatRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
