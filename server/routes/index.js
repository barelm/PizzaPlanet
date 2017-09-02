/**
 * Created by evronor on 09/08/2017.
 */

var express = require('express'),
    path = require('path'),
    router = express.Router();

// Define the routes for all models
router.use('/Branches', require('./Branches'));
router.use('/Products', require('./Products'));
router.use('/Employees', require('./Employees'));

// Redirect to the home page as response to requests on the default route
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/../../index.html'));
});

// Middleware for errors handling
router.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send(err.message);
});

module.exports = router;