var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var branchSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    Name: {type: String, required: true},
    Region: {type: String, required: true, enum: ["מרכז", "צפון", "דרום"]},
    City: {type: String, required: true},
    IsKosher: Boolean,
    Address: {type: String, required: true},
    IsDisabledAccessible: Boolean
});

// the schema is useless so far
// we need to create a model using it
var Branch = mongoose.model('Branch', branchSchema);

// make this available to our users in our Node applications
module.exports = Branch;