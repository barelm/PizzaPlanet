/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('EmployeeController', function ($scope, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {

        $scope.employees = [];

        EmployeeService.getEmployees().then(function mySuccess(response) {
            $scope.employees = response;
        }, function myError(error) {

        })
    }
});

app.controller('EmployeeCreateController', function ($scope, $routeParams ,$location, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.maxDate = new Date();
        $scope.sexValues = EmployeeService.getSexValues();
        $scope.roleValues = EmployeeService.getRoleValues();
    }

    $scope.insertEmployee = function () {

        // Get fields value.
        // var Name     = $scope.newEmployee.Name;
        // var Sex      = $scope.newEmployee.Sex;
        // var Role     = $scope.newEmployee.Role;
        // var Wage     = $scope.newEmployee.Wage;
        // var City     = $scope.newEmployee.City;
        // var Birthday = $scope.newEmployee.Birthday;
        // var JoinDate = $scope.newEmployee.JoinDate;

        EmployeeService.insertEmployee($scope.newEmployee).then(function mySuccess(response) {
            // Clear fields.
            $scope.newEmployee.Name     = '';
            $scope.newEmployee.Sex      = '';
            $scope.newEmployee.Role     = '';
            $scope.newEmployee.Wage     = '';
            $scope.newEmployee.City     = '';
            $scope.newEmployee.Birthday = '';
            $scope.newEmployee.JoinDate = '';

            // Return to Employees list view
            $location.path('/employee')

        }, function myError(error) {

        })
    }
});


app.controller('EmployeeDetailsController', function ($scope, $routeParams, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? ($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);
    }
});


app.controller('EmployeeDeleteController', function ($scope, $routeParams ,$location, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? ($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);
    }

    $scope.deleteEmployee = function () {

        EmployeeService.deleteEmployee($scope.selEmployee._id).then(function mySuccess(response) {
            $location.path('/employee')
        }, function myError(error) {

        })
    };
});


app.controller('EmployeeEditController', function ($scope, $routeParams ,$location, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? ($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);

        $scope.sexValues = EmployeeService.getSexValues();
        $scope.roleValues = EmployeeService.getRoleValues();
    }

    $scope.editEmployee = function(){
        EmployeeService.editEmployee($scope.selEmployee).then(function mySuccess(response) {
            $scope.editEmployee = {};

            // Return to Employees list view
            $location.path('/employee')
        }, function myError(error) {

        })
    }
});