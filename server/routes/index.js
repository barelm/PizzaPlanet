/**
 * Created by evronor on 09/08/2017.
 */

var express = require('express'),
    router = express.Router();

router.use('/Branches', require('./Branches'));

router.get('/', function(req, res) {
    res.send('Home page')
});

// Middleware for errors handling
router.use(function(err, req, res, next) {
    res.send(err);
})

module.exports = router;