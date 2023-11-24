const path = require('path');
const express = require("express");
/* Initialising a file where the user messages can be stored */
const userMessageFiles = {};

const app = express();

/* Importing the files to route */
const loginRouter = require('./routes/login');
const chatRouter = require('./routes/chat');
const contactUsRouter = require('./routes/contactus');
const successRouter = require('./routes/success');

/* Importing 404 error handle controller */
const handle404Controller = require('./controllers/404errorHandle');

// Ensure userMessageFiles is available in your routes
app.use((req, res, next) => {
  req.userMessageFiles = userMessageFiles;
  next();
});

app.use('/', loginRouter);
app.use('/chat', chatRouter);
/* Code using the success and contactus form from the routes */
app.use('/contactus', contactUsRouter);
app.use('/success', successRouter);

/* Code for 404 error & its conncetion with the views html file */
app.use(handle404Controller.handle404);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
