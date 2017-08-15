var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Cost: {type: Number, required: true, min: 0},
    IsKosher: {type: Boolean, default: false },
    IsVegetarian: {type: Boolean, default: false },
    IsVegan: {type: Boolean, default: false }
});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;