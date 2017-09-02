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
            });
    };

    this.insertProduct= function (product) {
        var jsonProduct = JSON.stringify(product);

        var url = SERVER_URL + '/Products';

        return $http.post(url, jsonProduct)
            .then(function mySuccess(response) {
                return response.data;
            }, function myError(response) {
            });
    }

    this.deleteProduct = function (_id) {
        var url = SERVER_URL + '/Products/' + _id;

        return $http.delete(url)
            .then(function mySuccess(response) {
                return response.data;
            }, function myError(response) {
            });
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
                return response.data;
            }, function myError(response) {
            });
    }

    this.getDollarRate = function () {
        // Web service - get dollar rate.
        return $http.get(DOLLAR_RATE_WEB_SERVICE_URL)
            .then(function mySucces(response) {
                return response.data.rates['USD']
            }, function myError(response) {
            });
    }

});