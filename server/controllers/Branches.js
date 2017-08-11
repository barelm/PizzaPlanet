/**
 * Created by evronor on 09/08/2017.
 */

var Branch = require("../models/Branch");

exports.getAllBranches = function(req, res, next) {

    // Get all branches
    Branch.find({}, function(err, branches) {
        if (err) return next(err);

        // Send the fetched branches in the response
        res.send(branches);
    });
};

exports.createBranch = function(req, res, next) {

    // Create a new branch
    var newBranch = Branch({
        id: 999,
        Name: req.body.Name,
        Region: req.body.Region,
        City: req.body.City,
        IsKosher: req.body.IsKosher,
        Address: req.body.Address,
        IsDisabledAccessible: req.body.IsDisabledAccessible
    });

    // Save the branch
    newBranch.save(function(err) {
        if (err) return next(err);

        // We have created the branch
        console.log('Branch created!');
        res.send(newBranch.id.toString());
    });
};

exports.updateBranch = function(req, res, next) {

    // Find the required branch by id
    Branch.findOneAndUpdate({ id: req.params.id }, req.body, function(err, branch) {
        if (err) return next(err);
        if (!branch) return next(new Error("There is no branch with ID: " + req.params.id));

        // We have updated the branch
        console.log('Branch updated!');
        res.send(req.params.id);
    });
};

exports.deleteBranch = function(req, res, next) {

    // Find the required branch by id
    Branch.findOneAndRemove({ id: req.params.id }, function(err, branch) {
        if (err) return next(err);
        if (!branch) return next(new Error("There is no branch with ID: " + req.params.id));

        // We have deleted the branch
        console.log('Branch deleted!');
        res.send(req.params.id);
    });
};