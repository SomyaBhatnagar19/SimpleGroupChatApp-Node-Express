/* /controller/contactSuccess.js */
const path = require('path');

exports.getDetailsOfForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'ContactUs.html'));
}

exports.SubmitFormDetails = (req, res) => {
    // Handle form submission here

    // Redirect to the success page after processing the form
    res.redirect('/success');
}

//controller to handle the success message on screen
exports.successMessage = (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'Success.html'));
}