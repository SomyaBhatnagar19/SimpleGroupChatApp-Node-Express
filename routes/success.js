// routes/success.js
//http://localhost:3000/success
const path = require('path');
const express = require('express');
const router = express.Router();

/* Importing the success controller */
const successMessageController = require('../controllers/contactSuccess');

router.get('/', successMessageController.successMessage);

module.exports = router;
