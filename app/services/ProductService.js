/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('ProductService', function ($http) {

    this.products = [];
    var self = this;

    this.getProducts = function () {
        var url = 'http://localhost:3000' + '/Products';
        return $http.get(url)
            .then(function mySuccess(response) {
                self.products = response.data;
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
        // return products;
    };

    this.insertProduct= function (product) {
        var jsonProduct = JSON.stringify(product);

        var url = 'http://localhost:3000' + '/Products';

        return $http.post(url, jsonProduct)
            .then(function mySuccess(response) {
                self.insertProductLocal(response.data);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.insertProductLocal= function (product) {
        products.push({
            id: product.id,
            Name: product.Name,
            Description: product.Description,
            Cost: product.Cost,
            IsKosher: product.IsKosher,
            IsVegetarian: product.IsVegetarian,
            IsVegan: product.IsVegan
        });
    };

    this.deleteProduct = function (id) {
        var url = 'http://localhost:3000' + '/Products/' + id;

        return $http.delete(url)
            .then(function mySuccess(response) {
                self.deleteProductLocal(id);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.deleteProductLocal = function (id) {
        for (var i = this.products.length - 1; i >= 0; i--) {
            if (this.products[i].id === id) {
                this.products.splice(i, 1);
                break;
            }
        }
    };

    this.getProduct = function (id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                return this.products[i];
            }
        }

        return null;
    };

    this.editProduct = function (product) {
        var jsonProduct = JSON.stringify(angular.copy(product));

        var url = 'http://localhost:3000' + '/Products/' + product.id;

        return $http.put(url, jsonProduct)
            .then(function mySuccess(response) {
                self.editProductLocal(product);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.editProductLocal = function (product) {
        for (var i = this.products.length - 1; i >= 0; i--) {
            if (this.products[i].id === Product.id) {
                this.products[i] = Product;
            }
        }
    }

    this.getDollarRate = function () {

    }

    // var products = [
    //     {
    //         id: 1, Name: 'The First', Description: 'פיצה מאוד מאוד טעימה', Cost: 23, IsKosher: true,
    //         IsVegetarian: true, IsVegan: false
    //     },
    //     {
    //         id: 2, Name: 'The Second', Description: 'חרא של סוסים', Cost: 123, IsKosher: true,
    //         IsVegetarian: true, IsVegan: true
    //     },
    //     {
    //         id: 3, Name: 'The Third', Description: 'פיצה מאוד מאוד לא טעימה', Cost: 44, IsKosher: false,
    //         IsVegetarian: false, IsVegan: false
    //     }
    // ];

});