/**
 * Created by evronor on 02/08/2017.
 */

var express = require("express");
var path = require('path');
var cors = require("cors");
var routes = require("./routes");
var bodyParser = require("body-parser");
// var mongoose = require("mongoose");
var dbConnection = require("./dbConnection");
var app = express();

// Add support for parsing of application/json type post data
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

// Serve static files
app.use('/Content', express.static(path.join(__dirname, '/../Content')));
app.use('/Scripts', express.static(path.join(__dirname, '/../Scripts')));
app.use('/app', express.static(path.join(__dirname, '/../app')));

app.listen(3000, function() {
    console.log('Server running at port %s!', this.address().port)
});