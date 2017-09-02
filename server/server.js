/**
 * Created by evronor on 02/08/2017.
 */

var express = require("express");
var path = require('path');
var cors = require("cors");
var routes = require("./routes");
var bodyParser = require("body-parser");
var dbConnection = require("./dbConnection");
var branchesController = require('./controllers/Branches.js');
var io = require('socket.io');
var app = express();

// Add support for parsing of application/json type post data
app.use(bodyParser.json());

// Enable CORS Requests
app.use(cors());

// Define all routes
app.use(routes);

// Serve static files
app.use('/Content', express.static(path.join(__dirname, '/../Content')));
app.use('/Scripts', express.static(path.join(__dirname, '/../Scripts')));
app.use('/app', express.static(path.join(__dirname, '/../app')));

// Start the server and the socket.io
io = io.listen(app.listen(3000, function() {
    console.log('Server running at port %s!', this.address().port)
}));

// Listen to socket.io connection from client
io.sockets.on('connection', function (socket) {

    // Listen to an emit of 'branchCreated' event from client
    socket.on('branchCreated', function (data) {
        console.log(data.message + data.name);

        // Get promise with the updated branches list and broadcast
        // emit 'refreshBranches' event to all other clients
        branchesController.refreshBranches()
        .then(function(branches) {
            socket.broadcast.emit('refreshBranches', branches);
        })
        .catch(function(err) {
            console.log(err);
        });
    });
});