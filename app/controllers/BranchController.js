/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('BranchController', function ($scope, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.branches = BranchService.getBranches();
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
        $scope.newBranch.IsKosher             = false;
        $scope.newBranch.IsDisabledAccessible = false;
    };

    $scope.deleteBranch = function (id) {
        BranchService.deleteBranch(id);
    };

    $scope.editBranch = function(){
        BranchService.insertCustomer($scope.editBranch);

        $scope.editBranch = {};
    }
});