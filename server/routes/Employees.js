/**
 * Created by evronor on 11/08/2017.
 */

var employeesController = require('../controllers/Employees.js');

var express = require('express'),
    router = express.Router();

router.get('/', employeesController.getAllEmployees);
router.post('/', employeesController.createEmployee);
router.put('/:id', employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);

module.exports = router;