/* Importing below */
const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fs = require("fs");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());

// Middleware to get the login details
router.get("/", (req, res) => {
  // res.send(`
  //   <html>
      
  //     <body>
  //       <form method="post" action="/Login">
  //         <h2>Login Page</h2>
  //         <label for="email">Email Id: </label>
  //         <input type="email" name="email" id="email" required>
  //         <button type="submit">Login</button>
  //       </form>
  //     </body>
  //   </html>
  // `);
  res.sendFile(path.join(__dirname, '../', 'views', 'Login.html'));

});

// Middleware to post the login details like username and store email in localStorage
router.post("/Login", (req, res) => {
  const email = req.body.email;
  const username = email.split('@')[0];
  const messageFilePath = `messages_${username}.txt`;
  
  req.userMessageFiles[username] = messageFilePath;
  
  if (!fs.existsSync(messageFilePath)) {
    fs.writeFileSync(messageFilePath, '');
  }
  
  const script = `<script>
                    localStorage.setItem('email', '${email}');
                    window.location.href = '/chat/Welcome'; 
                  </script>`;
  
  res.send(script);
});
/*Exports  */
module.exports = router;
