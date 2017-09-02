/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, prov_ider) with
//each doing the same thing just structuring the functions/data differently.
app.service('EmployeeService', function ($http) {

    this.employees = [];
    var self = this;

    this.getEmployees = function () {

        var url = SERVER_URL + '/Employees';
        return $http.get(url)
            .then(function mySuccess(response) {
                self.employees = self.mongoToAngularData(response.data)
                // this.employees = response.data;
                return self.employees;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });

        // return employees;
    };

    this.getEmployeesByAges = function () {

        var url = SERVER_URL + '/Employees/ByAges';

        return $http.get(url)
            .then(function mySucces(response) {
                self.employeesByAges = response.data;
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.getEmployeesWageByBranch = function () {

        var url = SERVER_URL + '/Employees/WageByBranch';

        return $http.get(url)
            .then(function mySucces(response) {
                self.employeesWageByBranch = response.data;
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.mongoToAngularData = function (branches) {
        branches.forEach(function(v,i) {
            // Convert date.
            branches[i].Birthday = new Date(branches[i].Birthday);
            branches[i].JoinDate = new Date(branches[i].JoinDate);

            var branch = branches[i].BranchId;
            branches[i].BranchId   = branch._id;
            branches[i].BranchName = branch.Name;
        });

        return branches
    }

    this.insertEmployee= function (employee) {
        var jsonEmployee = JSON.stringify(employee);

        var url = SERVER_URL + '/Employees';

        return $http.post(url, jsonEmployee)
            .then(function mySuccess(response) {
                // self.insertEmployeeLocal(response.data);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.insertEmployeeLocal= function (employee) {
        employees.push({
            _id: employee._id,
            Name: employee.Name,
            Sex: employee.Sex,
            Role: employee.Role,
            Wage: employee.Wage,
            City: employee.City,
            Birthday: employee.Birthday,
            JoinDate: employee.JoinDate
        });
    }

    this.deleteEmployee = function (_id) {
        var url = SERVER_URL + '/Employees/' + _id;

        return $http.delete(url)
            .then(function mySuccess(response) {
                // self.deleteEmployeeLocal(_id);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.deleteEmployeeLocal = function (_id) {
        for (var i = this.employees.length - 1; i >= 0; i--) {
            if (this.employees[i]._id === _id) {
                this.employees.splice(i, 1);
                break;
            }
        }
    }

    this.getEmployee = function (_id) {
        for (var i = 0; i < this.employees.length; i++) {
            if (this.employees[i]._id === _id) {
                return this.employees[i];
            }
        }
        return null;
    };

    this.editEmployee = function (employee) {
        var jsonEmployee = JSON.stringify(angular.copy(employee));

        var url = SERVER_URL + '/Employees/' + employee._id;

        return $http.put(url, jsonEmployee)
            .then(function mySuccess(response) {
                // self.editEmployeeLocal(employee);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.editEmployeeLocal = function (employee) {
        for (var i = this.employees.length - 1; i >= 0; i--) {
            if (this.employees[i]._id === employee._id) {
                this.employees[i] = employee;
            }
        }
    }

    this.getSexValues = function () {
        var sexValues = ["זכר","נקבה"];
        return sexValues;
    }

    this.getRoleValues = function () {
        var roleValues = ["מנהל סניף","שליח","אחראי משמרת","מוכר","טבח"];
        return roleValues;
    }

});