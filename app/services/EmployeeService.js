/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('EmployeeService', function ($http) {

    this.employees = [];
    var self = this;

    this.getEmployees = function () {

        var url = SERVER_URL + '/Employees';
        return $http.get(url)
            .then(function mySuccess(response) {
                self.employees = self.mongoToAngularDate(response.data)
                // this.employees = response.data;
                return self.employees;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });

        // return employees;
    };

    this.mongoToAngularDate = function (branches) {
        branches.forEach(function(v,i) {
            branches[i].Birthday = new Date(branches[i].Birthday);
            branches[i].JoinDate = new Date(branches[i].JoinDate);
        });

        return branches
    }

    this.insertEmployee= function (employee) {
        var jsonEmployee = JSON.stringify(employee);

        var url = SERVER_URL + '/Employees';

        return $http.post(url, jsonEmployee)
            .then(function mySuccess(response) {
                self.insertEmployeeLocal(response.data);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.insertEmployeeLocal= function (employee) {
        employees.push({
            id: employee.id,
            Name: employee.Name,
            Sex: employee.Sex,
            Role: employee.Role,
            Wage: employee.Wage,
            City: employee.City,
            Birthday: employee.Birthday,
            JoinDate: employee.JoinDate
        });
    }

    this.deleteEmployee = function (id) {
        var url = SERVER_URL + '/Employees/' + id;

        return $http.delete(url)
            .then(function mySuccess(response) {
                self.deleteEmployeeLocal(id);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    };

    this.deleteEmployeeLocal = function (id) {
        for (var i = this.employees.length - 1; i >= 0; i--) {
            if (this.employees[i].id === id) {
                this.employees.splice(i, 1);
                break;
            }
        }
    }

    this.getEmployee = function (id) {
        for (var i = 0; i < this.employees.length; i++) {
            if (this.employees[i]._id === id) {
                return this.employees[i];
            }
        }
        return null;
    };

    this.editEmployee = function (employee) {
        var jsonEmployee = JSON.stringify(employee);

        var url = SERVER_URL + '/Employees/' + employee.id;

        return $http.put(url, jsonEmployee)
            .then(function mySuccess(response) {
                self.editEmployeeLocal(employee);
                return response.data;
            }, function myError(response) {
                // TODO: לעשות משהו?
            });
    }

    this.editEmployeeLocal = function (employee) {
        for (var i = this.employees.length - 1; i >= 0; i--) {
            if (this.employees[i].id === employee.id) {
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

    // var employees = [
    //     {
    //         id: 1, Name: 'The First', Sex: 'זכר', Role: 'מנהל סניף', Wage: 13400,
    //         City: 'Tel Aviv', Birthday: new Date('12/12/1994'), JoinDate: new Date('12/12/2016')
    //     },
    //     {
    //         id: 2, Name: 'The Second', Sex: 'נקבה', Role: 'שליח', Wage: 1400,
    //         City: 'Tel Aviv', Birthday: new Date('06/01/1963'), JoinDate: new Date('01/15/2017')
    //     },
    //     {
    //         id: 3, Name: 'The Third', Sex: 'זכר', Role: 'שליח', Wage: 300,
    //         City: 'Tel Aviv', Birthday: new Date('07/19/2002'), JoinDate: new Date('04/21/2017')
    //     }
    // ];

});