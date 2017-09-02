/**
 * Created by evronor on 11/08/2017.
 */

var productsController = require('../controllers/Products.js');

var express = require('express'),
    router = express.Router();

// Define the routes of the model
router.get('/', productsController.getAllProducts);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;