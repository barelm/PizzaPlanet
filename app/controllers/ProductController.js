/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('ProductController', function ($scope, $http, ProductService) {

    init();

    function init() {

        $scope.products = [];

        // Get products list
        ProductService.getProducts().then(function mySuccess(response) {
            $scope.products = response;
        }, function myError(error) {

        })

        //  Get dollar rate
        ProductService.getDollarRate().then(function mySuccess(response) {
            $scope.usdRate = response;
        }, function myError(error) {

        })

        // Define initial sort.
        $scope.propertyName = 'Name';

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
    }

    $scope.resetSearch = function () {
        $scope.productSearch.Name = "";
        $scope.productSearch.Description = "";
        $scope.productSearch.IsKosher = "";
        $scope.productSearch.IsVegetarian = "";
        $scope.productSearch.IsVegan = "";
    }
});

app.controller('ProductCreateController', function ($scope, $routeParams ,$location, ProductService) {

    init();

    function init() {
    }

    $scope.insertProduct = function () {
        // Add new customer
        ProductService.insertProduct($scope.newProduct).then(function mySuccess(response) {
            // Clear fields.
            $scope.newProduct.Name         = '';
            $scope.newProduct.Description  = '';
            $scope.newProduct.Cost         = '';
            $scope.newProduct.IsKosher     = '';
            $scope.newProduct.IsVegetarian = '';
            $scope.newProduct.IsVegan      = '';

            // Return to Products list view
            $location.path('/product')

        }, function myError(error) {

        })
    }
});


app.controller('ProductDetailsController', function ($scope, $routeParams, $location, ProductService) {

    init();

    function init() {
        // Get selected products
        var productID = ($routeParams.productID) ? ($routeParams.productID) : 0;
        $scope.selProduct = ProductService.getProduct(productID);

        if ($scope.selProduct == null) {
            $location.path('/product');
        }
    }
});


app.controller('ProductDeleteController', function ($scope, $routeParams ,$location, ProductService) {

    init();

    function init() {
        // Get selected products
        var productID = ($routeParams.productID) ? ($routeParams.productID) : 0;
        $scope.selProduct = ProductService.getProduct(productID);

        if ($scope.selProduct === null) {
            $location.path('/product');
        }
    }

    $scope.deleteProduct = function () {
        ProductService.deleteProduct($scope.selProduct._id).then(function mySuccess(response) {
            // Return to Products list view
            $location.path('/product')
        }, function myError(error) {

        })
    };
});


app.controller('ProductEditController', function ($scope, $routeParams ,$location, ProductService) {

    init();

    function init() {
        // Get selected products
        var productID = ($routeParams.productID) ? ($routeParams.productID) : 0;
        $scope.selProduct = ProductService.getProduct(productID);

        if ($scope.selProduct === null) {
            $location.path('/product');
        }
    }

    $scope.editProduct = function(){
        ProductService.editProduct($scope.selProduct).then(function mySuccess(response) {
            $scope.editProduct = {};

            // Return to Products list view
            $location.path('/product')
        }, function myError(error) {

        })
    }
});