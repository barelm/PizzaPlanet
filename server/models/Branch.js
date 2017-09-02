var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var branchSchema = new Schema({
    Name: {type: String, required: true},
    Region: {type: String, required: true, enum: ["צפון", "שרון", "מרכז", "דרום"]},
    City: {type: String, required: true},
    IsKosher: {type: Boolean, default: false },
    Address: {type: String, required: true},
    IsDisabledAccessible: {type: Boolean, default: false }
});

// Create a model from the schema and export it
var Branch = mongoose.model('Branch', branchSchema);
module.exports = Branch;