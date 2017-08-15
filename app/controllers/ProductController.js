/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('ProductController', function ($scope, $http, ProductService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {

        $scope.products = [];

        ProductService.getProducts().then(function mySuccess(response) {
            $scope.products = response;
        }, function myError(error) {

        })

        // Get USD value rate.
        $http({
            method: "GET",
            url: 'http://api.fixer.io/latest?base=ILS&symbols=USD'
        }).then(function mySucces(response) {
            $scope.usdRate = response.data.rates['USD']
        }, function myError(response) {
            // TODO: לעשות משהו?
        });
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

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
    }

    $scope.insertProduct = function () {

        // Get fields value.
        var Name         = $scope.newProduct.Name;
        var Description  = $scope.newProduct.Description;
        var Cost         = $scope.newProduct.Cost;
        var IsKosher     = $scope.newProduct.IsKosher;
        var IsVegetarian = $scope.newProduct.IsVegetarian;
        var IsVegan      = $scope.newProduct.IsVegan;

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


app.controller('ProductDetailsController', function ($scope, $routeParams, ProductService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var productID = ($routeParams.productID) ? ($routeParams.productID) : 0;
        $scope.selProduct = ProductService.getProduct(productID);
    }
});


app.controller('ProductDeleteController', function ($scope, $routeParams ,$location, ProductService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var productID = ($routeParams.productID) ? ($routeParams.productID) : 0;
        $scope.selProduct = ProductService.getProduct(productID);
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

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var productID = ($routeParams.productID) ? ($routeParams.productID) : 0;
        $scope.selProduct = ProductService.getProduct(productID);

        //$scope.sexValues = ProductService.getSexValues();
        //$scope.roleValues = ProductService.getRoleValues();
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