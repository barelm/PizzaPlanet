/**
 * Created by evronor on 02/08/2017.
 */

var express = require("express");
var cors = require("cors");
var routes = require("./routes");
var bodyParser = require('body-parser');
var app = express();

// Add support for parsing of application/json type post data
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

app.listen(3000, function() {
    console.log('Server running at port %s!', this.address().port)
});