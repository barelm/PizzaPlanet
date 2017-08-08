/**
 * Created by Barmen on 08/08/2017.
 */

app.controller('GraphController', function ($scope, BranchService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.branches = BranchService.getBranches();


        $scope.jsonData = [
            {
                product: 'The First', count: 10
            },
            {
                product: 'The Second', count: 5
            },
            {
                product: 'The Third', count: 15
            }
        ];
    }
});
