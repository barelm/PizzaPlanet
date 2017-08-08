/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('EmployeeController', function ($scope, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.employees = EmployeeService.getEmployees();
    }

    $scope.resetSearch = function () {
        // $scope.EmployeeSearch.City = "";
        // $scope.EmployeeSearch.IsKosher = "";
        // $scope.EmployeeSearch.IsDisabledAccessible = "";
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
        var Name     = $scope.newEmployee.Name;
        var Sex      = $scope.newEmployee.Sex;
        var Role     = $scope.newEmployee.Role;
        var Wage     = $scope.newEmployee.Wage;
        var City     = $scope.newEmployee.City;
        var Birthday = $scope.newEmployee.Birthday;
        var JoinDate = $scope.newEmployee.JoinDate;

        // Add new customer
        EmployeeService.insertEmployee(Name, Sex, Role, Wage, City, Birthday, JoinDate);

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
    }
});


app.controller('EmployeeDetailsController', function ($scope, $routeParams, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? parseInt($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);
    }
});


app.controller('EmployeeDeleteController', function ($scope, $routeParams ,$location, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? parseInt($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);
    }

    $scope.deleteEmployee = function () {
        EmployeeService.deleteEmployee($scope.selEmployee.id);

        // Return to Employees list view
        $location.path('/employee')
    };
});


app.controller('EmployeeEditController', function ($scope, $routeParams ,$location, EmployeeService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? parseInt($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);

        $scope.sexValues = EmployeeService.getSexValues();
        $scope.roleValues = EmployeeService.getRoleValues();
    }

    $scope.editEmployee = function(){
        EmployeeService.editEmployee($scope.selEmployee);

        $scope.editEmployee = {};

        // Return to Employees list view
        $location.path('/employee')
    }
});