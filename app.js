//app.js
/* importing express to the file */
const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  res.send("<h1>Simple Chat App</h1>");
});

app.listen(3000);
