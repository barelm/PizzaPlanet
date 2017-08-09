/**
 * Created by evronor on 09/08/2017.
 */

var express = require('express'),
    router = express.Router();

router.use('/', require('./Branches'));

router.get('/', function(req, res) {
    res.send('Home page')
});

module.exports = router;