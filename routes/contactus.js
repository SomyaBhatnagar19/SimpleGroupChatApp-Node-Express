// routes/contactus.js
const path = require('path');
const express = require('express');
const router = express.Router();

/* Importing the controllers for the below get and post requests */
const getFormDetailsController = require('../controllers/contactSuccess');
const postFormSubmissionController = require('../controllers/contactSuccess');
router.get('/', getFormDetailsController.getDetailsOfForm);

router.post('/submitContactForm', postFormSubmissionController.SubmitFormDetails);

module.exports = router;
