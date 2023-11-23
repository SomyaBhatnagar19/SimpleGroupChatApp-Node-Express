// routes/contactus.js
const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'ContactUs.html'));
});

router.post('/submitContactForm', (req, res) => {
    // Handle form submission here

    // Redirect to the success page after processing the form
    res.redirect('/success');
});

module.exports = router;
