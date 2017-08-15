/**
 * Created by evronor on 11/08/2017.
 */

var Employee = require("../models/Employee");

exports.getAllEmployees = function(req, res, next) {

    // Get all employees
    Employee.find({}, function(err, employees) {
        if (err) return next(err);

        // Send the fetched employees in the response
        res.send(employees);
    });
};

exports.createEmployee = function(req, res, next) {

    // Create a new employee
    var newEmployee = Employee({
        Name: req.body.Name,
        Sex: req.body.Sex,
        Role: req.body.Role,
        Wage: req.body.Wage,
        City: req.body.City,
        Birthday: req.body.Birthday,
        JoinDate: req.body.JoinDate
    });

    // Save the employee
    newEmployee.save(function(err, employee) {
        if (err) return next(err);

        // We have created the employee
        console.log('Employee created!');
        res.send(employee._id);
    });
};

exports.updateEmployee = function(req, res, next) {

    // Find the required employee by id
    Employee.findByIdAndUpdate(req.params.id, req.body, { runValidators: true }, function(err, employee) {
        if (err) return next(err);
        if (!employee) return next(new Error("There is no employee with ID: " + req.params.id));

        // We have updated the employee
        console.log('Employee updated!');
        res.send(req.params.id);
    });
};

exports.deleteEmployee = function(req, res, next) {

    // Find the required employee by id
    Employee.findByIdAndRemove(req.params.id, function(err, employee) {
        if (err) return next(err);
        if (!employee) return next(new Error("There is no employee with ID: " + req.params.id));

        // We have deleted the employee
        console.log('Employee deleted!');
        res.send(req.params.id);
    });
};