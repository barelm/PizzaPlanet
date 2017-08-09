/**
 * Created by evronor on 02/08/2017.
 */

var express = require("express");
var cors = require("cors");
var routes = require("./routes");
var app = express();

app.use(cors());
app.use(routes);

app.listen(3000, function() {
    console.log('Server running at port %s!', this.address().port)
});