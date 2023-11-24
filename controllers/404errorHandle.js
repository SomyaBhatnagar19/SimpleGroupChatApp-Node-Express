//404 error handling controller
/* /controller/404errorHandler.js */
const path = require('path');

exports.handle404 = (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html'));
}