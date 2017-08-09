/**
 * Created by evronor on 02/08/2017.
 */

var express = require("express");
var app = express();

app.use(require('./routes'));

app.listen(3000, function() {
    console.log('Server running at port %s!', this.address().port)
});