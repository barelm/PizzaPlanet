var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Cost: {type: Number, required: true, min: 0},
    IsKosher: Boolean,
    IsVegetarian: Boolean,
    IsVegen: Boolean
});

// the schema is useless so far
// we need to create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;