//app.js
/* importing express to the file */
const express = require("express");
const app = express();

// const username = localStorage.getElementById('email');
// console.log(username);

app.use("/", (req, res, next) => {
  res.send(`
  <html>
    <form>
    <h2> Login Page </h2>
      <label>Email Id: </label>
      <input type="email" name="email" id="email"/>
      <button type="submit">
        Login
      </button>
    </form>
  </html>
`);
});

app.listen(3000);
