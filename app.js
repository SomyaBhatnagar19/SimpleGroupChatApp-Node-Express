//app.js
/* importing express to the file */
const express = require("express");
/* importing body-parser to store the data in localstorage */
const bodyParser = require("body-parser");

const app = express();

/* using body parser middleware to access the data */
app.use(bodyParser.urlencoded({ extended: false }));

/* Middleware to get the login details */
app.get("/", (req, res, next) => {
  res.send(`
  <html>
    <form method="post" action="/Login">
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

/* Middleware to post the login details like username in the localstorage*/
app.post("/Login", (req, res, next) => {
  const username = req.body.email;
  
  // Send a response that includes a script to set localStorage on the client side
  res.send(`
      <html>
        <script>
          localStorage.setItem('email', '${username}');
          window.location.href = '/Welcome';
        </script>
      </html>
    `);
});

/* Middleware for chating or messages writing and showing */
app.post("/Welcome", (req, res, next) => {
  const username = `<script>document.write(localStorage.getItem('email'));</script>`;
  const message = req.body.message;

  res.send(`
    <html>
      <h3>Welcome ${username} !!</h3>
      <form method="post" action="/Welcome">
        <label>
          Write your message:
        </label>
        <input type="text" name="message">
        <button type="submit">Send Message</button>
      </form>
      <ul>
        <li>
          <ui>
            ${username}: ${message}
          </ui>
        </li>
      </ul>
    </html>
  `);
});

app.post("/Welcome", (req, res, next) => {
    const username = `<script>document.write(localStorage.getItem('email'));</script>`;
    const message = req.body.message;
  
    res.send(`
      <html>
        <h3>Welcome ${username} !!</h3>
        <form method="post" action="/Welcome">
          <label>
            Write your message:
          </label>
          <input type="text" name="message">
          <button type="submit">Send Message</button>
        </form>
        <ul>
          <li>
            <ui>
              ${username}: ${message}
            </ui>
          </li>
        </ul>
      </html>
    `);
  });
  
app.listen(3000);
