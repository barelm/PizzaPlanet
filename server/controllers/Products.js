/**
 * Created by evronor on 11/08/2017.
 */

var Product = require("../models/Product");

exports.getAllProducts = function(req, res, next) {

    // Get all products
    Product.find({}, function(err, products) {
        if (err) return next(err);

        // Send the fetched products in the response
        res.send(products);
    });
};

exports.createProduct = function(req, res, next) {

    // Create a new product
    var newProduct = Product({
        Name: req.body.Name,
        Description: req.body.Description,
        Cost: req.body.Cost,
        IsKosher: req.body.IsKosher,
        IsVegetarian: req.body.IsVegetarian,
        IsVegan: req.body.IsVegan
    });

    // Save the product
    newProduct.save(function(err, product) {
        if (err) return next(err);

        // We have created the product
        console.log('Product created!');
        res.send(product._id);
    });
};

exports.updateProduct = function(req, res, next) {

    // Find the required product by id
    Product.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error("There is no product with ID: " + req.params.id));

        // We have updated the product
        console.log('Product updated!');
        res.send(req.params.id);
    });
};

exports.deleteProduct = function(req, res, next) {

    // Find the required product by id
    Product.findByIdAndRemove(req.params.id, function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error("There is no product with ID: " + req.params.id));

        // We have deleted the product
        console.log('Product deleted!');
        res.send(req.params.id);
    });
};