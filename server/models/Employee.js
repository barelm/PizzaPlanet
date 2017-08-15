var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var employeeSchema = new Schema({
    Name: {type: String, required: true},
    Sex: {type: String, required: true, enum: ["זכר", "נקבה"]},
    Role: {type: String, required: true, enum: ["מנהל סניף", "שליח", "אחראי משמרת", "מוכר", "טבח"]},
    BranchId: { type: mongoose.Schema.ObjectId, ref: 'Branch' },
    Wage: {type: Number, required: true, min: 0},
    City: {type: String, required: true},
    Birthday: {type:Date, required:true, max: Date.now()},
    JoinDate: {type:Date, required:true, max: Date.now()}
});

// the schema is useless so far
// we need to create a model using it
var Employee = mongoose.model('Employee', employeeSchema);

// make this available to our users in our Node applications
module.exports = Employee;