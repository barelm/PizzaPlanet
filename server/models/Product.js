var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema
var productSchema = new Schema({
    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Cost: {type: Number, required: true, min: 0},
    IsKosher: {type: Boolean, default: false },
    IsVegetarian: {type: Boolean, default: false },
    IsVegan: {type: Boolean, default: false }
});

// Create a model from the schema and export it
var Product = mongoose.model('Product', productSchema);
module.exports = Product;