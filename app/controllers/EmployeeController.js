/**
 * Created by Barmen on 04/08/2017.
 */

app.controller('EmployeeController', function ($scope, EmployeeService) {

    init();

    function init() {

        $scope.employees = [];

        EmployeeService.getEmployees().then(function mySuccess(response) {
            $scope.employees = response;
        }, function myError(error) {

        })
    }

    $scope.propertyName = 'Name';

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };
});

app.controller('EmployeeCreateController', function ($scope, $routeParams ,$location, EmployeeService, BranchService) {

    init();

    function init() {
        $scope.maxDate = new Date();
        $scope.sexValues = EmployeeService.getSexValues();
        $scope.roleValues = EmployeeService.getRoleValues();

        // Get branches list.
        BranchService.getBranches().then(function mySuccess(response) {
            $scope.branches = response;
        }, function myError(error) {

        })
    }

    $scope.insertEmployee = function () {
        EmployeeService.insertEmployee($scope.newEmployee).then(function mySuccess(response) {
            // Clear fields.
            $scope.newEmployee.Name     = '';
            $scope.newEmployee.Sex      = '';
            $scope.newEmployee.Role     = '';
            $scope.newEmployee.BranchId = '';
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


app.controller('EmployeeDetailsController', function ($scope, $routeParams, $location, EmployeeService) {

    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? ($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);

        if ($scope.selEmployee === null) {
            $location.path('/employee');
        }
    }
});


app.controller('EmployeeDeleteController', function ($scope, $routeParams ,$location, EmployeeService) {

    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? ($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);

        if ($scope.selEmployee === null) {
            $location.path('/employee');
        }
    }

    $scope.deleteEmployee = function () {

        EmployeeService.deleteEmployee($scope.selEmployee._id).then(function mySuccess(response) {
            $location.path('/employee')
        }, function myError(error) {

        })
    };
});


app.controller('EmployeeEditController', function ($scope, $routeParams ,$location, EmployeeService, BranchService) {

    init();

    function init() {
        var employeeID = ($routeParams.employeeID) ? ($routeParams.employeeID) : 0;
        $scope.selEmployee = EmployeeService.getEmployee(employeeID);

        if ($scope.selEmployee === null) {
            $location.path('/employee');
        } else {

            // Init drop down list fields value.
            $scope.sexValues = EmployeeService.getSexValues();
            $scope.roleValues = EmployeeService.getRoleValues();

            // Get branches list.
            BranchService.getBranches().then(function mySuccess(response) {
                $scope.branches = response;
            }, function myError(error) {

            })
        }
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


app.controller('EmployeeByAgesController', function ($scope, $routeParams ,$location, EmployeeService) {

    init();

    function init() {

        $scope.employeesByAges = [];

        EmployeeService.getEmployeesByAges().then(function mySuccess(response) {
            $scope.employeesByAges = response;

            function createPieChart(data) {

                var canvas = document.getElementById("pieChartCanvas"),
                    context = canvas.getContext("2d");

                var width = canvas.width,
                    height = canvas.height,
                    radius = Math.min(width, height) / 2;

                var colors = ["#98abc5", "#8a89a6", "#d0743c", "#6b486b", "#a05d56", "#d0743c"];

                var arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0)
                    .context(context);

                var labelArc = d3.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40)
                    .context(context);

                var pie = d3.pie()
                    .sort(null)
                    .value(function (d) {
                        return d.count;
                    });

                context.translate(width / 2, height / 2);

                var arcs = pie(data);

                arcs.forEach(function (d, i) {
                    context.beginPath();
                    arc(d);
                    context.fillStyle = colors[i];
                    context.fill();
                });

                context.beginPath();
                arcs.forEach(arc);
                context.strokeStyle = "#fff";
                context.stroke();

                context.textAlign = "center";
                context.textBaseline = "middle";
                context.fillStyle = "#fff";
                arcs.forEach(function (d) {
                    context.font = "bold 18px Arial";
                    var c = labelArc.centroid(d);
                    context.fillText(d.data.age, c[0], c[1]);
                });
            }

            createPieChart($scope.employeesByAges);

        }, function myError(error) {

        })
    }
});


app.controller('EmployeeWageByBranchController', function ($scope, $routeParams ,$location, EmployeeService) {

    init();

    function init() {

        $scope.employeesWageByBranch = [];

        EmployeeService.getEmployeesWageByBranch().then(function mySuccess(response) {
            $scope.employeesWageByBranch = response;

            function createBarChart(data) {

                var svg = d3.select("svg"),
                    margin = {top: 20, right: 20, bottom: 30, left: 40},
                    width = +svg.attr("width") - margin.left - margin.right,
                    height = +svg.attr("height") - margin.top - margin.bottom;

                var x = d3.scaleBand().rangeRound([0, width]).padding(0.3),
                    y = d3.scaleLinear().rangeRound([height, 0]);

                var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                x.domain(data.map(function(d) { return d.branchName; }));
                y.domain([0, d3.max(data, function(d) { return d.averageWage; })]);

                g.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .style("font-size","16px")
                    .call(d3.axisBottom(x));

                g.append("g")
                    .style("font-size","12px")
                    .attr("class", "axis axis--y")
                    .call(d3.axisLeft(y))
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Average Wage");

                g.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(d.branchName); })
                    .attr("y", function(d) { return y(d.averageWage); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.averageWage); });
            }

            createBarChart($scope.employeesWageByBranch);

        }, function myError(error) {

        })
    }
});