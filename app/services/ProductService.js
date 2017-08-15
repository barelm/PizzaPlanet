/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, prov_ider) with
//each doing the same thing just structuring the functions/data differently.
app.service('ProductService', function ($http) {

    this.products = [];
    var self = this;

    this.getProducts = function () {
        var url = SERVER_URL + '/Products';
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

        var url = SERVER_URL + '/Products';

        return $http.post(url, jsonProduct)
            .then(function mySuccess(response) {
                // self.insertProductLocal(response.data);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.insertProductLocal= function (product) {
        products.push({
            _id: product._id,
            Name: product.Name,
            Description: product.Description,
            Cost: product.Cost,
            IsKosher: product.IsKosher,
            IsVegetarian: product.IsVegetarian,
            IsVegan: product.IsVegan
        });
    };

    this.deleteProduct = function (_id) {
        var url = SERVER_URL + '/Products/' + _id;

        return $http.delete(url)
            .then(function mySuccess(response) {
                // self.deleteProductLocal(_id);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.deleteProductLocal = function (_id) {
        for (var i = this.products.length - 1; i >= 0; i--) {
            if (this.products[i]._id === _id) {
                this.products.splice(i, 1);
                break;
            }
        }
    };

    this.getProduct = function (_id) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i]._id === _id) {
                return this.products[i];
            }
        }

        return null;
    };

    this.editProduct = function (product) {
        var jsonProduct = JSON.stringify(angular.copy(product));

        var url = SERVER_URL + '/Products/' + product._id;

        return $http.put(url, jsonProduct)
            .then(function mySuccess(response) {
                // self.editProductLocal(product);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.editProductLocal = function (product) {
        for (var i = this.products.length - 1; i >= 0; i--) {
            if (this.products[i]._id === Product._id) {
                this.products[i] = Product;
            }
        }
    }

    this.getDollarRate = function () {
        return $http.get(DOLLAR_RATE_WEB_SERVICE_URL)
            .then(function mySucces(response) {
                return response.data.rates['USD']
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

});