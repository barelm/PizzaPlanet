/**
 * Created by Barmen on 04/08/2017.
 */
//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with
//each doing the same thing just structuring the functions/data differently.
app.service('EmployeeService', function () {
    this.getEmployees = function () {
        return employees;
    };

    this.insertEmployee= function (Name, Sex, Role, Wage, City, Birthday, JoinDate) {
        var topID = employees.length + 1;
        employees.push({
            id: topID,
            Name: Name,
            Sex: Sex,
            Role: Role,
            Wage: Wage,
            City: City,
            Birthday: Birthday,
            JoinDate: JoinDate
        });
    };

    this.deleteEmployee = function (id) {
        for (var i = employees.length - 1; i >= 0; i--) {
            if (employees[i].id === id) {
                employees.splice(i, 1);
                break;
            }
        }
    };

    this.getEmployee = function (id) {
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].id === id) {
                return employees[i];
            }
        }
        return null;
    };

    this.editEmployee = function (employee) {
        for (var i = employees.length - 1; i >= 0; i--) {
            if (employees[i].id === employee.id) {
                employees[i] = employee;
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

    var employees = [
        {
            id: 1, Name: 'The First', Sex: 'זכר', Role: 'מנהל סניף', Wage: 13400,
            City: 'Tel Aviv', Birthday: new Date('12/12/1994'), JoinDate: new Date('12/12/2016')
        },
        {
            id: 2, Name: 'The Second', Sex: 'נקבה', Role: 'שליח', Wage: 1400,
            City: 'Tel Aviv', Birthday: new Date('06/01/1963'), JoinDate: new Date('01/15/2017')
        },
        {
            id: 3, Name: 'The Third', Sex: 'זכר', Role: 'שליח', Wage: 300,
            City: 'Tel Aviv', Birthday: new Date('07/19/2002'), JoinDate: new Date('04/21/2017')
        }
    ];

});