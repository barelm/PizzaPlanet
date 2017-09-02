var mongoose = require("mongoose");
var dbUrl = "mongodb://PizzaPlanet:Aa123456@ds055812.mlab.com:55812/pizza_planet";

// Use native ES6 promises
mongoose.Promise = global.Promise;

// Connect to the database and export the connection
module.exports = mongoose.connect(dbUrl,
    {
        useMongoClient: true
    },
    function(err) {
        if (err) console.log(err);
    }
);