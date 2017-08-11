var mongoose = require("mongoose");
var dbUrl = "mongodb://PizzaPlanet:Aa123456@ds055812.mlab.com:55812/pizza_planet";
mongoose.Promise = global.Promise;

module.exports = mongoose.connect(dbUrl,
    {
        useMongoClient: true
    },
    function(err) {
        if (err) {
            console.log(err);
        }
    }
);