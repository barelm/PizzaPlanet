/**
 * Created by evronor on 09/08/2017.
 */

var express = require('express'),
    router = express.Router();

router.use('/Branches', require('./Branches'));
router.use('/Products', require('./Products'));
router.use('/Employees', require('./Employees'));

router.get('/', function(req, res) {
    res.send('Home page')
});

// Middleware for errors handling
router.use(function(err, req, res, next) {
    console.log(err.stack);
    res.status(500).send(err.message);
});

module.exports = router;