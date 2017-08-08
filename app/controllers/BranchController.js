/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('BranchController', function ($scope, $http, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.branches = BranchService.getBranches();

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
        $scope.branchSearch.City = "";
        $scope.branchSearch.IsKosher = "";
        $scope.branchSearch.IsDisabledAccessible = "";
    }
});

app.controller('BranchCreateController', function ($scope, $routeParams ,$location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.regionValues = BranchService.getRegionValues();
    }

    $scope.insertBranch = function () {
        // Get fields value.
        var Name                 = $scope.newBranch.Name;
        var Region               = $scope.newBranch.Region;
        var City                 = $scope.newBranch.City;
        var IsKosher             = $scope.newBranch.IsKosher;
        var IsDisabledAccessible = $scope.newBranch.IsDisabledAccessible;

        // Add new customer
        BranchService.insertBranch(Name, Region, City, IsKosher, IsDisabledAccessible);

        // Clear fields.
        $scope.newBranch.Name                 = '';
        $scope.newBranch.Region               = '';
        $scope.newBranch.City                 = '';
        $scope.newBranch.IsKosher             = '';
        $scope.newBranch.IsDisabledAccessible = '';

        // Return to branches list view
        $location.path('/branch')
    }
});


app.controller('BranchDetailsController', function ($scope, $routeParams, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var branchID = ($routeParams.branchID) ? parseInt($routeParams.branchID) : 0;
        $scope.selBranch = BranchService.getBranch(branchID);
    }
});


app.controller('BranchDeleteController', function ($scope, $routeParams ,$location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var branchID = ($routeParams.branchID) ? parseInt($routeParams.branchID) : 0;
        $scope.selBranch = BranchService.getBranch(branchID);
    }

    $scope.deleteBranch = function () {
        BranchService.deleteBranch($scope.selBranch.id);

        // Return to branches list view
        $location.path('/branch')
    };
});


app.controller('BranchEditController', function ($scope, $routeParams ,$location, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var branchID = ($routeParams.branchID) ? parseInt($routeParams.branchID) : 0;
        $scope.selBranch = BranchService.getBranch(branchID);

        $scope.regionValues = BranchService.getRegionValues();
    }

    $scope.editBranch = function(){
        BranchService.editBranch($scope.selBranch);

        $scope.editBranch = {};

        // Return to branches list view
        $location.path('/branch')
    }
});